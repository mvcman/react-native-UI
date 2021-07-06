/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import JobFromEmployer from '../components/applicationQuery';

export default function ApplicantScreen({navigation}) {
    return(
    
          <JobFromEmployer 
          navigation={navigation}/> 
          
      )
}