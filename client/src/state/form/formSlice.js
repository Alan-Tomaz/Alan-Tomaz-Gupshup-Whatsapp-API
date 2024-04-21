import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    apiKey: import.meta.env.VITE_API_PRIVATE_KEY || null,
    templateKey: import.meta.env.VITE_API_TEMPLATE_KEY || null,
    source: null,
    destination: null,
    messageType: "Text",
    messageLink: null,
    parameters: [],
}

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        resetState: (state) => {
            state.apiKey = initialState.apiKey
            state.templateKey = initialState.templateKey
            state.source = initialState.source
            state.destination = initialState.destination
            state.messageType = initialState.messageType
            state.messageLink = initialState.messageLink
            state.parameters = initialState.parameters;
        },
        setApiKeyState: (state, action) => {
            state.apiKey = action.payload.apiKey;
        },
        setTemplateKeyState: (state, action) => {
            state.templateKey = action.payload.templateKey;
        },
        setSourceState: (state, action) => {
            state.source = action.payload.source;
        },
        setDestinationState: (state, action) => {
            state.destination = action.payload.destination;
        },
        setMessageTypeState: (state, action) => {
            state.messageType = action.payload.messageType;
        },
        setMessageLinkState: (state, action) => {
            state.messageLink = action.payload.messageLink;
        },
        setParamAdd: (state) => {
            state.parameters = [...state.parameters, ""]
        },
        setParamRemove: (state, action) => {
            console.log(action)
            state.parameters = state.parameters.filter((elem, i) => i !== action.payload.index);
        },
        setParamEdit: (state, action) => {
            state.parameters[action.payload.index] = action.payload.text;
        }
    }
})

export const { resetState, setApiKeyState, setTemplateKeyState, setSourceState, setDestinationState, setMessageTypeState, setMessageLinkState, setParamAdd, setParamRemove, setParamEdit } = formSlice.actions;

export default formSlice.reducer;