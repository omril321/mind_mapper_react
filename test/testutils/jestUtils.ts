function mockDefaultModuleExport(moduleName: string, defaultExport: any) {
    jest.setMock(moduleName, {default: defaultExport});
}

export {mockDefaultModuleExport};
