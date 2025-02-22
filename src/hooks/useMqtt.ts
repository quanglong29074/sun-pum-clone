// eslint-disable-next-line
// @ts-ignore
import mqtt from "mqtt/dist/mqtt.esm";
import {useEffect} from "react";

const useMqtt = (eventCallBack: any) => {
  useEffect(() => {
    const client = mqtt.connect("wss://wss.fcs.ninja/mqtt");
    client.on("connect", () => {
      console.log("Connected to EMQ server");
      // Subscribe to topics or perform other actions here
      client.subscribe('pho/#');
      client.on("message", (receivedTopic: any, message: any) => {
        if (receivedTopic.toString() === 'pho/new-token') {
          eventCallBack('token', JSON.parse(message.toString()));
        }
        if (receivedTopic.toString() === 'pho/token-funding-history') {
          eventCallBack('trade', JSON.parse(message.toString()));
        }
      });
    });
  }, []);
}

export default useMqtt;