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

  concatToLowerCase: function (string) {
    return string.split(" ").join("").toLowerCase();
  },

  editIcon: function (promptUser, loggedUser, promptId, floating = true) {
    if (promptUser._id.toString() == loggedUser._id.toString()) {
      if (floating) {
        return `<a href="/prompts/edit/${promptId}" class="absolute text-center w-12 h-12 top-0 right-[5%] transform -translate-y-1/4 bg-blue-700 hover:bg-blue-800 border-blue-800 border-2 text-white p-2 rounded-full"><i class="fas fa-edit text-xs"></i></a>`;
      } else {
        return `<a href="/prompts/edit/${promptId}"><i class="fas fa-edit"></i></a>`;
      }
    } else {
      return "";
    }
  },

  select: function (selected, options) {
    return options
      .fn(this)
      .replace(new RegExp(' value="' + selected + '"'), '$& selected="selected"')
      .replace(new RegExp(">" + selected + "</option>"), ' selected="selected"$&');
  },
};
