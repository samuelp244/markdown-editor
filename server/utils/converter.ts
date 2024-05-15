import showdown from "showdown";

export const convertMdToHtml = (markdownText: string) => {
  let converter = new showdown.Converter(),
    html = converter.makeHtml(markdownText);
  return html;
};
