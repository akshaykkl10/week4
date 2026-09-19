const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export function formatDate(date = null, format = null) {
    if( date == null) {
        throw new Error("Null date detected.")
    }
    
    if (!(date instanceof Date)) {
        throw new Error("Input is not a date")
    }
    const day  = String(date.getDate()).padStart(2,"0")
    const year = date.getFullYear()
    if (format == null)
    {
        throw new Error("Null format detected.")
    }
    if (format == "DD-MM-YYYY") {
        const month = String(date.getMonth()).padStart(2, "0")
        return `${day}-${month}-${year}`
    }
    if (format == "DD/MM/YYYY") {
        const month = String(date.getMonth()+1).padStart(2, "0")
        return `${day}/${month}/${year}`
    }
    if (format == "MM-DD-YYYY") {
        const month = String(date.getMonth()).padStart(2, "0")
        return `${month}-${day}-${year}`
    }
    if (format == "YYYY-MM-DD") {
        const month = String(date.getMonth()).padStart(2, "0")
        return `${year}-${month}-${day}`
    }

    if (format == "DD MONTH, YYYY") {
        const month = months[date.getMonth()-1]
        return `${day} ${month}, ${year}`
    }
    if (format == "MONTH DD, YYYY") {
        const month = months[date.getMonth()-1]
        return `${month} ${day}, ${year}`
    }
    if (format == 'relative') {
        const now = Date.now()
        const diffTime =  now - date.getTime()
        const diffDays = Math.floor(diffTime/ (1000 * 60 * 60 * 24));
        if (diffDays > 0) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
        }
        if (diffDays < 0) {
            return `${-diffDays} day${diffDays < -1 ? 's' : ''} to go`
        }
        return 'today'

    }
    throw new Error("No Match")
}