import axios from 'axios'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { resetState, setApiKeyState, setDestinationState, setMessageLinkState, setMessageTypeState, setParamAdd, setParamEdit, setParamRemove, setSourceState, setTemplateKeyState } from './state/form/formSlice';
import Whatsapp from './assets/whatsapp.png';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import qs from "qs";

function App() {

  /* STATE FORM VALUES */

  const [apiKey, setApiKey] = useState(useSelector((state) => state.formReducer.apiKey));
  const [templateKey, setTemplateKey] = useState(useSelector((state) => state.formReducer.templateKey));
  const [sourceNumber, setSourceNumber] = useState(useSelector((state) => state.formReducer.source));
  const [destinationNumber, setDestinationNumber] = useState(useSelector((state) => state.formReducer.destination));
  const [messageType, setMessageType] = useState(useSelector((state) => state.formReducer.messageType));
  const [messageLink, setMessageLink] = useState(useSelector((state) => state.formReducer.messageLink));
  const [parameters, setParameters] = useState(useSelector((state) => state.formReducer.parameters));
  const dispatch = useDispatch();
  const textArea = document.getElementById("jsonRes");

  const handleChange = (e) => {
    switch (e.target.name) {
      case "apiKey":
        setApiKey(e.target.value);
        dispatch(setApiKeyState({ apiKey: e.target.value }));
        break;
      case "templateKey":
        setTemplateKey(e.target.value);
        dispatch(setTemplateKeyState({ templateKey: e.target.value }));
        break;
      case "source":
        setSourceNumber(e.target.value);
        dispatch(setSourceState({ source: e.target.value }));
        break;
      case "destination":
        setDestinationNumber(e.target.value);
        dispatch(setDestinationState({ destination: e.target.value }));
        break;
      case "messageType":
        setMessageType(e.target.value);
        dispatch(setMessageTypeState({ messageType: e.target.value }));
        break;
      case "messageLink":
        setMessageLink(e.target.value);
        dispatch(setMessageLinkState({ messageLink: e.target.value }));
        break;
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/sendText", {
      data: {
        source: sourceNumber,
        destination: destinationNumber,
        apiKey,
        templateKey,
        parameters
      }
    }).then((res) => {
      console.log(res);
    })
  };

  const handleResetForm = (e) => {
    e.preventDefault();
    dispatch(resetState());
    setApiKey('');
    setTemplateKey('');
    setSourceNumber('');
    setDestinationNumber('');
    setMessageType("Text");
    setMessageLink('');
    setParameters([]);
  }

  const handleAddParam = () => {
    const paramArr = [...parameters, ""];
    setParameters(paramArr);
    dispatch(setParamAdd())
  }

  const handleRemoveParam = (index) => {
    const paramArr = parameters.filter((elem, i) => i !== index);
    setParameters(paramArr);
    dispatch(setParamRemove({ index }))
  }

  const handleEditParam = (e) => {
    const paramArr = [...parameters];
    paramArr[e.target.id] = e.target.value;
    setParameters(paramArr);
    dispatch(setParamEdit({ index: e.target.id, text: e.target.value }))
  }

  return (
    <div className='App'>
      <h1>Whatsapp API</h1>
      <img src={Whatsapp} alt="whatsapp" />
      <h3>Credentials</h3>
      <form className='form' id='form'>
        <label htmlFor="messageType">Message Type</label>
        <select name="messageType" id="messageType" onChange={handleChange}>
          <option value="Text" selected={messageType === "Text"}>Text</option>
          <option value="Document" selected={messageType === "Document"}>Document</option>
          <option value="Image" selected={messageType === "Image"}>Image</option>
          <option value="Video" selected={messageType === "Video"}>Video</option>
        </select>
        <br />
        <label htmlFor="apiKey">Api Key</label>
        <input type="text" name='apiKey' id='apiKey' value={apiKey} onChange={handleChange} />
        <br />
        <label htmlFor="templateKey">Template Key</label>
        <input type="text" name='templateKey' id='templateKey' value={templateKey} onChange={handleChange} />
        <br />
        <label htmlFor="source">Source Number</label>
        <input type="text" name='source' id='source' value={sourceNumber} onChange={handleChange} />
        <br />
        <label htmlFor="destination">Destination Number</label>
        <input type="text" name='destination' id='destination' value={destinationNumber} onChange={handleChange} />
        {messageType != "Text" && (
          <>
            <br />
            <label htmlFor="messageLink">{messageType} Link</label>
            <input type="text" name='messageLink' id='messageLink' value={messageLink} onChange={handleChange} />
          </>
        )}
        <h3>Parameters</h3>
        {/* Add Parameter */}
        <div onClick={handleAddParam}><IoIosAdd /></div>
        {parameters.map((elem, index) => (
          <>
            <label key={`${index}`} htmlFor={`param-${index + 1}`}>{`{{${index + 1}}}`}</label>
            <input type="text" key={`input-${index}`} name={`param-${index + 1}`} id={`${index}`} value={parameters[index]} onChange={handleEditParam} />
            <div key={`minus-div-${index}`} onClick={() => handleRemoveParam(index)}><IoIosRemove /></div>
          </>
        ))}
        <button type="submit" onClick={handleResetForm}>Reset Form</button>
        <button type="submit" onClick={handleSendMessage}>Send Message</button>
      </form>
      <h3>Response: </h3>
      <textarea name="jsonRes" id="jsonRes" cols="30" rows="10" readOnly={true} ></textarea>
    </div>
  )
}

export default App
