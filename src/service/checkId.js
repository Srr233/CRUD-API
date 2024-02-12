function checkId(userId) {
  return userId.split("-").length === 5;
}

export { checkId };
