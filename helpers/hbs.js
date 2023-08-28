module.exports = {
  formatDate: function (date) {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  },

  toUpperCase: function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
};
