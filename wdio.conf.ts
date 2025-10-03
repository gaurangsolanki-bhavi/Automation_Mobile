import path from 'path';

export const testConfig = {
  excelPath: path.resolve(__dirname, './test-data/XLXS/userData.xlsx')
};

beforeEach(function () {
  require('./Utils/globalSetupMobile.ts');
});