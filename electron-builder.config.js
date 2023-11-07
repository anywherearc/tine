/**
 * TODO: Rewrite this config to ESM
 * But currently electron-builder doesn't support ESM configs
 * @see https://github.com/develar/read-config-file/issues/10
 */

/**
 * @type {() => import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
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
  };
};
