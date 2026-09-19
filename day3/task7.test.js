import { describe, it, expect } from "vitest";
import { formatDate } from "./task7";
describe("formatDate", () => {
    it ("gives Null format error", () => {
        const date = new Date(2026,8,18);
        expect(() => formatDate()).toThrow("Null date detected.");
    });
    it ("gives Null format error", () => {
        const date = new Date(2026,8,18);
        expect(() => formatDate(date)).toThrow("Null format detected.");
    });
    it ("gives Null format error", () => {
        const date = "2026,8,18";
        expect(() => formatDate(date, "DD-MM-YYYY")).toThrow("Input is not a date");
    });
    
    it ("gives format DD-MM-YYYY", () => {
        const date = new Date(2026,9,18);
        expect(formatDate(date, "DD-MM-YYYY")).toBe('18-09-2026');
    });
    it ("gives format MM-DD-YYYY", () => {
        const date = new Date(2026,9,18);
        expect(formatDate(date, "MM-DD-YYYY")).toBe('09-18-2026');
    });
    it ("gives format YYYY-MM-DD", () => {
        const date = new Date(2026,9,18);
        expect(formatDate(date, "YYYY-MM-DD")).toBe('2026-09-18');
    });
    it ("gives format DD MONTH, YYYY", () => {
        const date = new Date(2026,9,18);
        expect(formatDate(date, "DD MONTH, YYYY")).toBe('18 September, 2026');
    });
    it ("gives format MONTH DD, YYYY", () => {
        const date = new Date(2026,8,18);
        expect(formatDate(date, "MONTH DD, YYYY")).toBe('August 18, 2026');
    });
    it("gives relative date format", () => {
        const date = new Date(2026,8,19);
        expect(formatDate(date, "relative")).toBe('today');
    });

    it("gives relative date format", () => {
        const date = new Date(2026,8,16);
        expect(formatDate(date, "relative")).toBe('3 days ago');
    });
    it("gives relative date format", () => {
        const date = new Date(2026,8,22);
        expect(formatDate(date, "relative")).toBe('3 days to go');
    });
    it("gives relative date format", () => {
        const date = new Date(2026,8,18);
        expect(formatDate(date, "relative")).toBe('1 day ago');
    });
    it("gives relative date format", () => {
        const date = new Date(2026,8,20);
        expect(formatDate(date, "relative")).toBe('1 day to go');
    });
    it("No match date", () => {
        const date = new Date(2026,8,19);
        expect(() => formatDate(date, "")).toThrow("No Match")
    });
    it("formats February 29 correctly in a leap year", () => {
        const date = new Date(2024, 1, 29);
        expect(formatDate(date, "DD/MM/YYYY")).toBe("29/02/2024");
    });
    it("formats December 31 correctly", () => {
        const date = new Date(2026, 11, 31);
        expect(formatDate(date, "DD/MM/YYYY")).toBe("31/12/2026");
    });
    it("adds leading zeros to single digit day and month", () => {
        const date = new Date(2026, 0, 5);
        expect(formatDate(date, "DD/MM/YYYY")).toBe("05/01/2026");
    });
});