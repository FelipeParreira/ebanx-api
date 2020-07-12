import PdfParse from 'pdf-parse';
import { promisify } from 'bluebird';
import fs from 'fs';

const readFile = promisify(fs.readFile);

const readPDFFile = async (filePath: string): Promise<string> => {
  const dataBuffer = await readFile(filePath);
  const fileContents = await PdfParse(dataBuffer);
  const text = fileContents.text.trim();
  return text;
};

const splitTextIntoQuestions = (text: string): string[] => {
  // TODO find where each question starts and ends, using regexes.
  const lines = text.split('\n');
  return lines;
};

export { readPDFFile, splitTextIntoQuestions };
