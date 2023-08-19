// Imports the Google Cloud client library
import * as textToSpeech from "@google-cloud/text-to-speech";

// Import other required libraries
import fs from "fs";
import util from "util";

const option = {
  keyFilename: "secret.json",
};

// Creates a client
const client = new textToSpeech.TextToSpeechClient(option);

export async function textRecording(
  inputText: string,
  voiceType: string,
  fileName: string
) {
  // The text to synthesize
  const text = inputText;

  // Construct the request
  const request: textToSpeech.protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest =
    {
      input: { text: text },
      // Select the language and Neural2 voice
      voice: {
        languageCode: "ja-JP",
        name: voiceType,
      },
      // select the type of audio encodingN
      audioConfig: { audioEncoding: "MP3" },
    };
  if (inputText && fileName && voiceType !== "音声を選択") {
    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(
      `${fileName}.mp3`,
      response.audioContent as Buffer,
      "binary"
    );
    console.log(`Audio content written to file: ${fileName}.mp3`);
  }
}
