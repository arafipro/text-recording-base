"use client";

import { useState } from "react";

const voiceTypes = [
  { name: "女性B/femaleB", type: "ja-JP-Neural2-B" },
  { name: "男性C/maleC", type: "ja-JP-Neural2-C" },
  { name: "男性D/maleD", type: "ja-JP-Neural2-D" },
];

export default function Home() {
  const [voiceType, setVoiceType] = useState<string>("音声を選択");

  return (
    <main className="bg-gray-200 w-full h-screen">
      <div className="max-w-2xl mx-auto h-full">
        <h1 className="text-3xl text-center py-4">Text to Speech App</h1>
        <form action="#" className="h-full">
          <textarea
            required
            className="textarea textarea-bordered w-full h-2/3 mb-4"
            placeholder="音声変換するテキストを入力"
          ></textarea>
          <div className="flex">
            <select
              value={voiceType}
              className="select w-full max-w-xs"
              onChange={(e) => setVoiceType(e.target.value)}
            >
              <option disabled>音声を選択</option>
              {voiceTypes.map((voiceType) => (
                <option key={voiceType.name} value={voiceType.type}>
                  {voiceType.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="音声ファイル名"
              required
              className="input input-bordered w-full max-w-xs mx-4"
            />
            <button type="submit" className="btn btn-neutral w-1/2">
              <span className="text-xl tracking-widest">音声変換実行</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
