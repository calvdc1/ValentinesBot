const fs = require('fs');
const path = require('path');

const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(process.cwd(), 'data'));

try {
  fs.mkdirSync(DATA_DIR, { recursive: true });
} catch (_) {}

function getFilePath(guildId) {
  return path.join(DATA_DIR, `${guildId}.json`);
}

function getDefaultData(guildId) {
  return {
    guildId,
    lobbyChannelId: null,
    dashboardChannelId: null,
    categoryId: null,
    queue: [],
    activeChannels: []
  };
}

function loadData(guildId) {
  const filePath = getFilePath(guildId);
  if (!fs.existsSync(filePath)) {
    return getDefaultData(guildId);
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return getDefaultData(guildId);
    }
    return parsed;
  } catch (_) {
    return getDefaultData(guildId);
  }
}

function saveData(guildId, data) {
  const filePath = getFilePath(guildId);
  const tmpPath = `${filePath}.tmp`;
  try {
    fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2));
    fs.renameSync(tmpPath, filePath);
    return true;
  } catch (_) {
    try {
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    } catch (_) {}
    return false;
  }
}

module.exports = {
  loadData,
  saveData
};
