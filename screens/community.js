import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import { globalStyles } from "../styles/global";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import MyCard from '../shared/card';
import * as DB from '../api/database';
import * as Auth from '../api/auth';


export default function Community() {
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        return DB.getUserProfile(Auth.getCurrentUserId(), setUserProfile);
    }, []);

    const LeftContent = props => <Avatar.Icon {...props} icon="account" />

    const CommunityCard = () => (
        <Card style={{backgroundColor: '#F5F5F5'}} onPress={() => {}}>
            <Card.Title title={userProfile.name} subtitle={userProfile.role} left={LeftContent} />
            <Card.Content>
                <Title>Sick workout</Title>
                <MyCard>
                    <View style={styles.cardHeader}>
                        <Title>Fucking sick workout</Title>
                    </View>
                </MyCard>
                <Paragraph>Goodness GRACIOUS me, get shredded with this 1 secret tip!</Paragraph>
            </Card.Content>

            <Card.Actions>
                <Button onPress={() => {}}>Like</Button>
                <Button onPress={() => {}}>Comment</Button>
                <Button onPress={() => {}}>Share</Button>
            </Card.Actions>
        </Card>
    );

    return (
        <View style={globalStyles.container}>
            <CommunityCard />
        </View>
    );
}

const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});