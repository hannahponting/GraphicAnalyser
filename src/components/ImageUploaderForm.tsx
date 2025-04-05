'use client'
import Image from 'next/image';
import { useState } from 'react';

export default function ImageUpload() {

  const [preview, setPreview] = useState<string | null>(null);
  const [b64String, setB64String] = useState<string | null>(null);
  const [response, setResponse] = useState<string[]> ([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    const base64Encoded = await fileToBase64String(file);
    setB64String(base64Encoded)
};

  const fileToBase64String = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString('base64');
    return base64String;
  };

  const handleClick = async () => {
    setIsLoading(true)
    if(b64String){
        const aiResponse = await fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ b64String: b64String }),
          });
        const words  = await aiResponse.json();
        setResponse(oldArray => [...oldArray, words.response])
        setIsLoading(false)

    }
  }


  return ( isLoading ? (<div>Loading....</div>) :(
    <div className="space-y-4">
        <h1 className="text-3xl font-bold">Graphic Analyser</h1>
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
        <input type="file" accept="image/*" onChange={handleImageChange}   className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                                                                        file:rounded-lg file:border-0
                                                                                        file:text-sm file:font-semibold
                                                                                        file:bg-blue-50 file:text-blue-700
                                                                                        hover:file:bg-blue-100"/>
      </div>
      {preview && (
        <div className="">
          <p>Preview:</p>
          <Image height={500} width={500} src={preview} alt="Preview" className="mt-2 max-w-sm rounded shadow" />
          {b64String && (
          <button className=' w-1/4 mr-4 py-2 px-4 block text-md text-blue-700 rounded-lg border-0 font-semibold bg-blue-50 hover:bg-blue-100' onClick={handleClick}>Submit</button>
          )}
        </div>
      )}

        {response.length != 0 ?  (
         <div>
          {response.map((r, k) => {
            return (
              <div className="p-4 mt-4 bg-green-50 text-green-700 text-center rounded-xl shadow" key={k}>
                {r}
              </div>
            )
          })}
          </div>
    ):(<div/>)}


    
    </div>
  ));
}
