const modulesFiles = require.context('../../', true, /index\.vue$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  if (modulePath.indexOf('customer') > -1) return modules;
  const vueComponent = modulesFiles(modulePath);
  const moduleName = vueComponent.default.name;
  if (moduleName) {
    modules[moduleName] = vueComponent.default;
  }
  return modules;
}, {});

export default modules;
