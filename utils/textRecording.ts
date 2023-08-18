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

export async function textRecording() {
  // The text to synthesize
  const text = "Hello World!";

  // Construct the request
  const request: textToSpeech.protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest =
    {
      input: { text: text },
      // Select the language and Neural2 voice
      voice: {
        languageCode: "en-US",
        ssmlGender: "NEUTRAL",
      },
      // select the type of audio encodingNU
      audioConfig: { audioEncoding: "MP3" },
    };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile("output.mp3", response.audioContent as Buffer, "binary");
  console.log("Audio content written to file: output.mp3");
}
