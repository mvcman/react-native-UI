/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import JobFromEmployer from '../components/applicationQuery';


export default function ApplicantScreen({navigation}) {
  const wsLink = new WebSocketLink({
    uri: 'wss://team-c.hasura.app/v1/graphql',
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': 'PcEURINYV1b1OVT8z0l0jsAvMb8Wkt67rJHtTPt8oKcTaLFeLwPAKPIJfe0S7V6g',
        }
      }
    },
  });
  
  const client = new ApolloClient({
    link: wsLink,
    cache: new InMemoryCache()
  });
  
    return(
        <ApolloProvider>
            
          <JobFromEmployer 
          navigation={navigation}/> 
          
        </ApolloProvider>
      )
}