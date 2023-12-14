function formatDisplayedName(email: string) {
  const slicedEmail = email.split('@');
  const [prefix, postfix] = slicedEmail as string[];
  let formattedPrefix;
  if (prefix.length > 6) {
    formattedPrefix = `${prefix.slice(0, 2)}`;
  } else {
    const asteriskRepeatTimes = prefix.length - 1;
    formattedPrefix = `${prefix.slice(0, 1)}${'*'.repeat(asteriskRepeatTimes)}`;
  }
  return `${formattedPrefix}***@${postfix}`;
}

export { formatDisplayedName };
