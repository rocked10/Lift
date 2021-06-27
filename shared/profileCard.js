import { Avatar, Card } from "react-native-paper";
import React from "react";


const LeftContent = props => <Avatar.Icon {...props} color='white' icon="account" />

const ProfileCard = ({ title, subtitle, onPress, right }) => (
    <Card style={{backgroundColor: '#F5F5F5'}} onPress={onPress}>
        <Card.Title
            titleStyle={{fontFamily: 'lato-bold'}}
            title={title}
            subtitle={subtitle}
            left={LeftContent}
            right={right}
        />
    </Card>
);

export default ProfileCard;