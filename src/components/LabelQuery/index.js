const modulesFiles = require.context('./modules', true, /index\.vue$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const vueComponent = modulesFiles(modulePath);
  const moduleName = vueComponent.default.name;
  if (moduleName) {
    modules[moduleName] = vueComponent.default;
  }
  return modules;
}, {});

export default modules;
