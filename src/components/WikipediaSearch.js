import React, { useState, useRef, useEffect, useCallback } from "react";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { FaDownload } from "react-icons/fa6";
import myImage from "../img.png";
import jsPDF from "jspdf";
const WikipediaSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [fontFamily, setfontFamily] = useState("");
  const [fontColor, setFontColor] = useState("#000000");
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [fontSizeOption, setFontSizeOption] = useState(16);
  const [customFontSize, setCustomFontSize] = useState("");
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [fontweight, setFontweight] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [italic, setItalic] = useState(false);
  const [reading, setReading] = useState(false);

  const previewStyle = {
    fontSize:
      fontSizeOption === "custom" && customFontSize
        ? `${customFontSize}px`
        : fontSizeOption === "default"
        ? "inherit"
        : `${fontSizeOption}px`,
    color: fontColor,
    lineHeight: lineSpacing,
    textAlign: "justify",
    border: "none",
    fontWeight: fontweight ? "bold" : "normal",
    fontStyle: italic ? "italic" : "normal",
    fontFamily: fontFamily,
  };

  const handleChange = (event) => {
    setSearch(true);
    setSearchTerm(event.target.value);
  };

  const [selectedOptionResult, setSelectedOptionResult] = useState("");
  const [search, setSearch] = useState(true);
  const handleSelectOption = async (event) => {
    setSearch(false);
    try {
      const url = `https://nexpedia.onrender.com/api/wiki/${event.title}`;
      const response = await fetch(url);
      const data = await response.json();
      setSelectedOptionResult(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data.");
    }
  };

  const handleCustomButtonClick = () => {
    setIsCustomizing(!isCustomizing);
    
  };

  const fetchData = useCallback (async() => {
    try {
      const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${searchTerm}&utf8=1&formatversion=2&origin=*`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.query && data.query.search) {
        setSearchResults(data.query.search);
        setError(null);
      } else {
        setSearchResults([]);
        setError("No relevant results found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data.");
    }
  },[searchTerm])

  const handleFontSizeChange = (value) => {
    setFontSizeOption(value);
    setCustomFontSize("");
  };

  useEffect(() => {
    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm,fetchData]);

  function readText() {
    setReading(true);
    const textToRead = document.getElementById("textToRead").textContent;
    if ("speechSynthesis" in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      synthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  }

  const stopReading = () => {
    setReading(false);
    if (speechSynthesis) {
      speechSynthesis.cancel();
    }
  };

  const contentRef = useRef(null);
  const [selectedText, setSelectedText] = useState(null);
  
  const colors = [
    "yellow",
    "cyan",
    "magenta",
    "orange",
    "green",
    "blue",
    "red",
    "purple",
    "pink",
    "lightgreen",
    "white",
  ];

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection) {
      const text = selection.toString();
      if (text) {
        setSelectedText(selection);
      } else {
        setSelectedText(null);
      }
    }
  };

  const handleColorChange = (color) => {
    setSelectedText(null);
    applyBackgroundColor(color, !selectedText);
  };

  const applyBackgroundColor = (color, applyToEntireText = false) => {
    if (applyToEntireText) {
      const range = document.createRange();
      range.selectNodeContents(contentRef.current);
      const newNode = document.createElement("span");
      newNode.style.backgroundColor = color;
      range.surroundContents(newNode);
      
    } else {
      if (selectedText) {
        const range = selectedText.getRangeAt(0);
        const newNode = document.createElement("span");
        newNode.style.backgroundColor = color;
        range.surroundContents(newNode);
        
      }
    }
  };

  const applyTextFormatting = (type, applyToEntireText = false) => {
    let styleValue = "";
    switch (type) {
      case "bold":
        styleValue = fontweight ? "normal" : "bold";
        setFontweight(!fontweight);
        break;
      case "underline":
        styleValue = underline ? "none" : "underline";
        setUnderline(!underline);
        break;
      case "italic":
        styleValue = italic ? "normal" : "italic";
        setItalic(!italic);
        break;
      default:
        break;
    }

    if (applyToEntireText) {
      const range = document.createRange();
      range.selectNodeContents(contentRef.current);
      const newNode = document.createElement("span");
      newNode.style[type === "underline" ? "textDecoration" : "fontWeight"] =
        styleValue;
      range.surroundContents(newNode);
    } else {
      if (selectedText) {
        const range = selectedText.getRangeAt(0);
        const newNode = document.createElement("span");
        newNode.style[type === "underline" ? "textDecoration" : "fontWeight"] =
          styleValue;
        range.surroundContents(newNode);
      }
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(fontSizeOption);
    doc.setFont(fontFamily, "normal");
    doc.setFontSize(fontSizeOption);
    doc.setFont(
      fontFamily,
      fontweight && italic
        ? "bolditalic"
        : fontweight
        ? "bold"
        : italic
        ? "italic"
        : "normal"
    );
    doc.setTextColor(fontColor);
    const titleWidth =
      (doc.getStringUnitWidth(selectedOptionResult.query.pages[0].title) * 14) /
      doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    doc.text(titleX, 50, selectedOptionResult.query.pages[0].title);
    doc.setFontSize(fontSizeOption);
    doc.setFont(
      fontFamily,
      fontweight && italic
        ? "bolditalic"
        : fontweight
        ? "bold"
        : italic
        ? "italic"
        : "normal"
    );
    const addJustifiedText = (text, x, y, maxWidth) => {
      doc.setTextColor(fontColor);
      doc.text(text, x, y, { maxWidth });
    };
    let yOffset = 70;
    yOffset += 10;
    addJustifiedText(
      selectedOptionResult.query.pages[0].extract,
      20,
      yOffset,
      170
    );
    doc.save(`${selectedOptionResult.query.pages[0].title}.pdf`);
  };

  return (
    <div className="grid grid-cols-12 ">
    
      <div className="col-span-2"></div>
      <div className="col-span-7">
        <div className="w-[90%] mt-10">
          <h1 className="text-3xl font-bold mb-4">Wikipedia Search</h1>
          <div className="flex items-center space-x-4">
            <input
              className="border border-[#5655c6] p-2 flex-grow"
              type="text"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Enter search term"
            />
            <button
              onClick={fetchData}
              className="bg-[#5655c6] text-white px-4 py-2 rounded"
            >
              Search
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {!search && (
            <button
              onClick={handleCustomButtonClick}
              className="mt-4 bg-[#4CAF50] text-white px-4 py-2 rounded ml-auto"
            >
              Customize..
            </button>
          )}
          {search
            ? searchResults.length > 0 && (
                <div className="mt-4">
                  <label htmlFor="searchOptions" className="font-semibold mb-2">
                    Select an option:
                  </label>
                  <ul className="p-2 w-full" style={{ textAlign: "justify" }}>
                    {searchResults.map((result) => (
                      <li key={result.pageid} className="mb-2">
                        <p
                          className="cursor-pointer text-lg text-blue-500 font-bold hover:underline"
                          onClick={() => handleSelectOption(result)}
                        >
                          {result.title}
                        </p>
                        <p
                          className="text-lg text-gray-600"
                          dangerouslySetInnerHTML={{ __html: result.snippet }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )
            : 
              selectedOptionResult && (
                <div className="mt-5">
                  <div className="flex flex-row items-center gap-3">
                    <p style={{ fontSize: "20px" }} className="font-semibold">
                      {selectedOptionResult.query.pages[0].title}
                    </p>
                    {reading ? (
                      <HiMiniSpeakerXMark onClick={stopReading} size={25} />
                    ) : (
                      <HiMiniSpeakerWave onClick={readText} size={25} />
                    )}
                  </div>
                  <p
                    style={previewStyle}
                    id="textToRead"
                    className="highlighted text-lg text-gray-600 mt-5 p-3 "
                    ref={contentRef}
                    contentEditable="true"
                    onMouseUp={handleMouseUp}
                  >
                    {selectedOptionResult.query.pages[0].extract}
                  </p>
                </div>
              )}
          {searchResults.length === 0 && !error && (
            <p className="mt-4">No results found.</p>
          )}
          {searchTerm.length === 0 && <img src={myImage} alt="wikipedia" width={650} />}
        </div>
      </div>

      <div className="col-span-3 mr-5 my-10">
        {isCustomizing && (
          <div className="mt-4">
            <div className="space-y-4">
              {isCustomizing && (
                <div className="mt-4">
                  <div className="space-y-4">
                    {isCustomizing && (
                      <div className="m-5">
                        <div className="space-y-4">
                          <div className="flex flex-col">
                            <label
                              htmlFor="fontSize"
                              className="mr-2 text-blue-600 mb-1 font-[600]"
                            >
                              Font Size:
                            </label>
                            <select
                              id="fontSize"
                              value={fontSizeOption}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                handleFontSizeChange(inputValue);
                              }}
                              className="border p-1"
                            >
                              <option
                                value="10"
                                style={{ fontSize: "12px", padding: "5px" }}
                              >
                                Smaller
                              </option>
                              <option
                                value="12"
                                style={{ fontSize: "14px", padding: "5px" }}
                              >
                                Small
                              </option>
                              <option
                                value="14"
                                style={{ fontSize: "16px", padding: "5px" }}
                              >
                                Default
                              </option>
                              <option
                                value="16"
                                style={{ fontSize: "18px", padding: "5px" }}
                              >
                                Medium
                              </option>
                              <option
                                value="18"
                                style={{ fontSize: "20px", padding: "5px" }}
                              >
                                Large
                              </option>
                              <option
                                value="20"
                                style={{ fontSize: "22px", padding: "5px" }}
                              >
                                Larger
                              </option>
                              <option
                                value="custom"
                                style={{ fontSize: "16px", padding: "5px" }}
                              >
                                Custom
                              </option>
                            </select>

                            <label htmlFor="fontFamily " className="text-blue-600 mb-1 font-[600] mr-2 mt-5">
                              Font Family:
                            </label>
                            <select
                              id="fontStyle"
                              value={fontFamily}
                              onChange={(e) => {
                                const selectedValue = e.target.value;
                                setfontFamily(selectedValue);
                              }}
                              className="border p-1"
                            >
                              <option
                                value="arial"
                                style={{ fontFamily: "Arial" }}
                              >
                                Arial
                              </option>
                              <option
                                value="times"
                                style={{ fontFamily: "Times New Roman" }}
                              >
                                Times New Roman
                              </option>
                              <option
                                value="courier"
                                style={{ fontFamily: "Courier New" }}
                              >
                                Courier New
                              </option>
                              <option
                                value="helvetica"
                                style={{ fontFamily: "Verdana" }}
                              >
                                Verdana
                              </option>
                            </select>
                            {fontSizeOption === "custom" && (
                              <input
                                type="number"
                                value={customFontSize}
                                onChange={(e) =>
                                  setCustomFontSize(e.target.value)
                                }
                                placeholder="Custom size"
                                className="border p-1 mt-2"
                              />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="fontColor" className="mr-2 text-blue-600 mb-1 font-[600]">
                              Font Color:
                            </label>
                            <input
                              type="color"
                              value={fontColor}
                              onChange={(e) => setFontColor(e.target.value)}
                              className="border p-1"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="lineSpacing" className="mr-2 text-blue-600 mb-1 font-[600]">
                              Line Spacing:
                            </label>
                            <input
                              type="number"
                              value={lineSpacing}
                              step="0.1"
                              onChange={(e) =>
                                setLineSpacing(parseFloat(e.target.value))
                              }
                              className="border p-1 "
                            />
                          </div>
                          <button
                            onClick={() => {
                              setFontweight(!fontweight);
                            }}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded font-semibold mr-4"
                          >
                            B
                          </button>
                          <button
                            onClick={() => {
                              setItalic(!italic);
                            }}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded font-italic mr-4"
                          >
                            I
                          </button>
                          <button
                            onClick={() => {
                              setUnderline(!underline);
                              applyTextFormatting("underline");
                            }}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded underline mr-4"
                          >
                            U
                          </button>
                          <p className="text-blue-600 mb-1 font-[600]">Highlight your text:</p>
                          {colors.map((color, index) => (
                            <button
                              key={index}
                              className="color-button"
                              style={{
                                backgroundColor: color,
                                width: "15px",
                                height: "15px",
                                borderRadius: "50%",
                                margin: "8px",
                              }}
                              onClick={() => handleColorChange(color)}
                            ></button>
                          ))}
                          <button
                            className="flex flex-row gap-2 bg-[#5655c6] text-white px-4 py-2 rounded items-center"
                            onClick={() => downloadPDF()}
                          >
                            Download <FaDownload />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WikipediaSearch;
