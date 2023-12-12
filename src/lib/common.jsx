export const formatPostText = (text) => {
  if (text) {
    const formattedText = text.replace(
      /#(\w+)/g,
      '<b><a href="/feeds/$1"+$1>#$1</a></b>'
    );
    return { __html: formattedText };
  } else {
    return text;
  }
};
