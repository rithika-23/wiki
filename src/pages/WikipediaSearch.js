import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";

const WikipediaSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  //styling
  const [fontColor, setFontColor] = useState("#000000");
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [fontSizeOption, setFontSizeOption] = useState(16);
  const [customFontSize, setCustomFontSize] = useState("");
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [reading, setReading] = useState(false);
  const applyCustomStyles = ({ fontSizeOption, fontColor, lineSpacing }) => {
    fontSizeOption(fontSizeOption);
    setFontColor(fontColor);
    setLineSpacing(lineSpacing);
  };

  const handleApplyCustomStyles = () => {
    setIsCustomizing(false);
    applyCustomStyles({
      fontSizeOption: `${fontSizeOption}px`,
      fontColor,
      lineSpacing,
    });
  };

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
    border:'none'
  };

  const handleChange = (event) => {
    setSearch(true);
    setSearchTerm(event.target.value);
    setSelectedOption(null); // Reset selected option when the search term changes
  };

  const [selectedOptionResult, setSelectedOptionResult] = useState("");
  const [search, setSearch] = useState(true);
  const handleSelectOption = async (event) => {
    setSearch(false);
    try {
      const url = `https://nexpedia.onrender.com/api/wiki/${event.title}`;
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data,'///')
      setSelectedOptionResult(data);
      setError(null); // Clear any previous error
    } catch (error) {
      // console.log('llllll')
      console.error("Error fetching data:", error);
      setError("Failed to fetch data.");
    }
  };

  const handleClearStyles = () => {
    setCustomFontSize("");
    setFontColor("#000000");
    setFontSizeOption(16);
    setLineSpacing(1.5);
    
  };

  const handleCustomButtonClick = () => {
    setIsCustomizing(!isCustomizing);
    console.log("Custom button clicked!");
  };

  const fetchData = async () => {
    try {
      const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${searchTerm}&utf8=1&formatversion=2&origin=*`
       const response = await fetch(url);
      const data = await response.json();

      if (data.query && data.query.search) {
        setSearchResults(data.query.search);
        setError(null); // Clear any previous error
      } else {
        setSearchResults([]);
        setError("No relevant results found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data.");
    }
  };

  const handleFontSizeChange = (value) => {
    console.log("VALUE", value);
    setFontSizeOption(value);
    // Reset custom font size when selecting an option from the dropdown
    setCustomFontSize("");
  };

  useEffect(() => {
    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm]);

  // ... (other code)

  function readText() {
    setReading(true);
    const textToRead = document.getElementById("textToRead").textContent;

    // Check if the browser supports the SpeechSynthesis API
    if ("speechSynthesis" in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(textToRead);

      // You can configure additional properties of the utterance here
      // For example:
      // utterance.lang = 'en-US';
      // utterance.rate = 1.0; // Speed of speech

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
  const [selectedColor, setSelectedColor] = useState(null);
  const colors = ['yellow', 'cyan', 'magenta', 'orange', 'green', 'blue', 'red', 'purple', 'pink', 'lightgreen','white'];

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection) {
      const text = selection.toString();
      if (text) {
        setSelectedText(selection);
      } else {
        setSelectedText(null); // Clear selectedText if no text is selected
      }
    }
  };

  const handleColorChange = (color) => {
    setSelectedText(null); // Clear selectedText when a color button is clicked
    applyBackgroundColor(color, !selectedText); // Apply color to entire text if no text is selected
  };

  const handleClearBackground = () => {
    setSelectedText(null); // Clear selected text
    applyBackgroundColor("white",true); // Set background color of entire text to white
  };

  const applyBackgroundColor = (color, applyToEntireText = false) => {
    console.log(color,'apply')
    if (applyToEntireText) {
      console.log(color,'apply')
      const range = document.createRange();
      range.selectNodeContents(contentRef.current);
      const newNode = document.createElement("span");
      newNode.style.backgroundColor = color;
      range.surroundContents(newNode);
      setSelectedColor(color); // Update selected color
    } else {
      if (selectedText) {
        const range = selectedText.getRangeAt(0);
        const newNode = document.createElement("span");
        newNode.style.backgroundColor = color;
        range.surroundContents(newNode);
        setSelectedColor(color); // Update selected color
      }
    }
  };

  return (
    <div className="grid grid-cols-12 ">
      {/* Empty space (25%) */}
      <div className="col-span-2"></div>

      {/* Search Content (60%) */}
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
              Custom Button
            </button>
          )}

          {/* Search Results */}
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
            : // Selected Option Result
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

          {/* No results message */}
          {searchResults.length === 0 && !error && (
            <p className="mt-4">No results found.</p>
          )}
        </div>
      </div>

      {/* Customization Controls (remaining space) */}
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
                          {/* Font Size Control */}
                          <div className="flex flex-col">
                            <label htmlFor="fontSize" className="mr-2">
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
                              <option value="10" style={{ fontSize: "10px" }}>
                                Smaller
                              </option>
                              <option value="12" style={{ fontSize: "12px" }}>
                                Small
                              </option>
                              <option value="14" style={{ fontSize: "14px" }}>
                                Default
                              </option>
                              <option value="16" style={{ fontSize: "16px" }}>
                                Medium
                              </option>
                              <option value="18" style={{ fontSize: "18px" }}>
                                Large
                              </option>
                              <option value="20" style={{ fontSize: "20px" }}>
                                Larger
                              </option>
                              <option
                                value="custom"
                                style={{ fontSize: "16px" }}
                              >
                                Custom
                              </option>
                            </select>
                            {/* Custom Font Size Input */}
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

                          {/* Font Color Control */}
                          <div className="flex flex-col">
                            <label htmlFor="fontColor" className="mr-2">
                              Font Color:
                            </label>
                            <input
                              type="color"
                              value={fontColor}
                              onChange={(e) => setFontColor(e.target.value)}
                              className="border p-1"
                            />
                          </div>
{/* Line Spacing Control */}
<div className="flex flex-col">
                            <label htmlFor="lineSpacing" className="mr-2">
                              Line Spacing:
                            </label>
                            <input
                              type="number"
                              value={lineSpacing}
                              step="0.1"
                              onChange={(e) =>
                                setLineSpacing(parseFloat(e.target.value))
                              }
                              className="border p-1"
                            />
                          </div>
<p>Highlight your text:</p>
                          {colors.map((color, index) => (
                          <button
                            key={index}
                            className="color-button"
                            style={{
                              backgroundColor: color,
                              width: "15px",
                              height: "15px",
                              borderRadius: "50%",margin:'7px'
                            }}
                            onClick={() => handleColorChange(color)}
                          >
                            
                          </button>
                        ))}

                          
<div className="flex flex-row justify-between">
                          {/* Apply Button */}
                          <button
                            className="bg-[#4CAF50] text-white px-4 py-2 rounded self-center"
                          >
                            Apply
                          </button>
                          
                            <button
                              onClick={handleClearStyles}
                              className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                              Clear Styles
                            </button>
                          </div>
                        </div>
                       
                      </div>
                    )}
                  </div>
                </div>
              )}{" "}
              {/* Your existing customization controls */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WikipediaSearch;