import { beforeEach, describe, expect, it } from "vitest";
import { accordion } from "./accordion";
import { FormValidator } from "./formValidator";
import { mobileNav } from "./hamburger";

describe("formValidator", () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <form id="contact-form">
            <input id="email" name="email">
            <span id="email-error" class="error-field"></span>
            <input id="username" name="username">
            <span id="username-error" class="error-field"></span>
            <button type="submit">Submit</button>
            </form>
        `
    })
    it("validates fields", () => {
        const formValidator = new FormValidator()
        const form = document.querySelector('form')
        formValidator.validate(form)
        const emailError = document.querySelector("#email-error").textContent
        const usernameError = document.querySelector("#username-error").textContent
        expect(emailError).toEqual("Email is required")
        expect(usernameError).toEqual("Username is required")
    })
    it("removes errors on corrected input", () => {
        const formValidator = new FormValidator()
        const form = document.querySelector('form')
        form.querySelector('#email').value = "akkukkl10@gmail.com"
        form.querySelector("#username").value = "AkshayKumarP"
        formValidator.validate(form)
        const emailError = document.querySelector("#email-error")
        const usernameError = document.querySelector("#username-error")
        expect(emailError.classList.contains("visible"))
        .toBe(false);

        expect(usernameError.classList.contains("visible"))
            .toBe(false);
        expect(emailError.textContent)
        .toBe("");

        expect(usernameError.textContent)
            .toBe("");
    })
})

describe("accordion", () => {
    it("opens the accordion", () => {
        document.body.innerHTML = `
            <div class="accordion">
                <button
                    class="accordion-header"
                    aria-expanded="false">
                    FAQ
                </button>

                <div class="accordion-panel" hidden>
                    Answer
                </div>
            </div>
        `
        accordion()
        const header = document.querySelector(".accordion-header");
        const panel = document.querySelector(".accordion-panel");
        header.click()
        expect(header.getAttribute("aria-expanded")).toBe("true")
        expect(panel.hidden).toBe(false)
    })
    it("closes the accordion", () => {
        document.body.innerHTML = `
            <div class="accordion">
                <button
                    class="accordion-header"
                    aria-expanded="true">
                    FAQ
                </button>

                <div class="accordion-panel">
                    Answer
                </div>
            </div>
        `
        accordion()
        const header = document.querySelector(".accordion-header");
        const panel = document.querySelector(".accordion-panel");
        header.click()
        expect(header.getAttribute("aria-expanded")).toBe("false")
        expect(panel.hidden).toBe(true)
    })
    it("missing accordion header", () => {
        document.body.innerHTML = `
            <div class="accordion">

                <div class="accordion-panel">
                    Answer
                </div>
            </div>
        `
        expect(() => accordion()).not.toThrow()
    })

    it("NO accordion", () => {
        document.body.innerHTML = ""
        
        expect(() => accordion()).not.toThrow()
    })
})

describe("hamburger",() => {
    
    it("opens mobile navigation and moves focus into drawer", () => {
        document.body.innerHTML = `
            <header>
                <button id="hamburger" aria-label="Open navigation">
                    ☰
                </button>
            </header>

            <nav id="mobile-drawer" aria-hidden="true">
                <button id="close-drawer" aria-label="Close navigation">
                    ✕
                </button>

                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Projects</a>
                <a href="#">Contact</a>
            </nav>
        `
        mobileNav()
        const hamburger = document.querySelector("#hamburger");
        const drawer = document.querySelector("#mobile-drawer");
        const closeButton = document.querySelector("#close-drawer");
        hamburger.click()
        expect(drawer.getAttribute("aria-hidden")).toBe("false")
        expect(document.activeElement).toBe(closeButton)
    })
    it("closes mobile navigation and moves focus into drawer", () => {
        document.body.innerHTML = `
            <header>
                <button id="hamburger" aria-label="Open navigation">
                    ☰
                </button>
            </header>

            <nav id="mobile-drawer" aria-hidden="false" class="open">
                <button id="close-drawer" aria-label="Close navigation">
                    ✕
                </button>

                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Projects</a>
                <a href="#">Contact</a>
            </nav>
        `
        mobileNav()
        const hamburger = document.querySelector("#hamburger");
        const drawer = document.querySelector("#mobile-drawer");
        const closeButton = document.querySelector("#close-drawer");
        closeButton.click()
        expect(drawer.getAttribute("aria-hidden")).toBe("true")
        expect(document.activeElement).toBe(hamburger)
    })
})