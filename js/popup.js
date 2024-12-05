async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function initializeDomain() {
  const tab = await getCurrentTab();
  if (tab && tab.url) {
    const url = new URL(tab.url);
    const parsed = psl.parse(url.hostname);
    $("#domain").val(parsed.domain);
  }
}

function capitalizeFirstLetter(str) {
  let result = '';
  let foundFirstLetter = false; 

  for (let i = 0; i < str.length; i++) {
      const char = str[i];

      if (!foundFirstLetter && /[a-zA-Z]/.test(char)) {
          result += char.toUpperCase();
          foundFirstLetter = true; 
      } else {
          result += char;
      }
  }

  if (!foundFirstLetter) {
      result = 'AZ' + str.slice(2); 
  }

  return result;
}

function getEndChar(s) {
  if (s.length > 0) {
      return s.charAt(s.length - 1); 
  } else {
      return "."; 
  }
}

initializeDomain();

const generatePassword = (d, s, p) => {
  return md5(md5(d) + md5(s) + md5(p));
};

$("#generate").click((e) => {
  const d = $("#domain").val();
  const s = $("#salt").val();
  const p = $("#password").val();

  const pass = capitalizeFirstLetter(generatePassword(d, s, p).slice(9, 9 + 12));

  const endChar = getEndChar(s);

  $("#encryptiontext").val(pass+endChar);
});
