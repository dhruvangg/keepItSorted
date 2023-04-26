import React, { createContext, useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export const TopicContext = createContext()

export function useTopicContext() {
    return useContext(TopicContext)
}

const initialState = []

export default function TopicProvider({ children }) {
    const [topics, setTopics] = useState(initialState)

    useEffect(() => {
        const topicData = JSON.parse(localStorage.getItem("topics"))
        topicData && setTopics(topicData);
    }, []);

    useEffect(() => {
        topics !== initialState && localStorage.setItem("topics", JSON.stringify(topics));
    }, [topics]);

    const createTopic = (obj) => {
        for (var key in obj) {
            obj[key] === null && delete obj[key];
        }
        const newTopic = { id: uuidv4(), ...obj }
        setTopics((prevTopics) => [...prevTopics, newTopic])
    }

    const updateTopic = (id, text) => {
        setTopics((prevTopics) => prevTopics.map((topic) => (topic.id === id ? { ...topic, title: text } : topic)))
    }

    const removeTopic = (id) => {
        setTopics((prevTopics) => {
            return prevTopics.filter(topic => topic.id !== id)
        })
    }

    const value = {
        topics,
        createTopic,
        updateTopic,
        removeTopic
    }
    return (
        <TopicContext.Provider value={value}>
            {children}
        </TopicContext.Provider>
    )

}
