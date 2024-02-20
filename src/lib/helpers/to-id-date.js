import format from "date-fns/format";
import id from "date-fns/locale/id";

/**
 * A helper function to format original date to ID Format
 * @param {string} date original date format
 * @returns {string} date in ID Format
 */
export const toIdDate = (date) =>
  format(date, "cccc, dd MMMM yyyy", {
    locale: id,
  });
