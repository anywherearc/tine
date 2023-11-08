module.exports = async function () {
  return {
    directories: {
      output: 'out',
    },
    files: [
        {
            "from": "dist",
            "to": "src",
        },
        "package.json",
        "**/node_modules/**/*"
    ],
    linux: {
      target: "AppImage",
    },    
    mac: {
      target: "dmg",
    },
    win: {
      target: "nsis",
    },
  };
};
