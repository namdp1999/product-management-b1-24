const SettingGeneral = require("../../models/setting-general.model");

module.exports.settingsGeneral = async (req, res, next) => {
  const settingsGeneral = await SettingGeneral.findOne({});

  res.locals.settingsGeneral = settingsGeneral;

  next();
}