function isCorrectUserData(user, dataForCheck) {
  if (typeof user === "object") {
    for (const { key, funcCheck } of dataForCheck) {
      if (funcCheck(user[key])) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }
}

export { isCorrectUserData };
