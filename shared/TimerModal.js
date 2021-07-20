import React, { useState } from 'react';
import { View, StyleSheet, Animated, } from 'react-native';
import { Modal, Portal, Provider, } from 'react-native-paper';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
//import ScrollPicker from "react-native-wheel-scroll-picker"; // Comment out when testing

const TimeSelection = ({ type, initialValue, onChange }) => {
    const generateOptions = type =>
        (type === 'seconds' || type === 'minutes') ? [...Array(60).keys()] : [...Array(100).keys()];

    const [options, _setOptions] = useState(generateOptions(type));

    return (
        <ScrollPicker
            dataSource={options}
            selectedIndex={initialValue}
            // renderItem={(data, index) => {}
            onValueChange={(_data, selectedIndex) => onChange(selectedIndex)}
            wrapperHeight={140}
            wrapperWidth={50}
            wrapperBackground={"white"}
            itemHeight={60}
            highlightColor={"blue"}
            highlightBorderWidth={1.5}
        // fontFamily={'lato-regular'}
        />
    );
}

const renderTime = isPlaying => ({ remainingTime, animatedColor }) => {
    const hrs = Math.floor(remainingTime / 3600);
    const mins = Math.floor((remainingTime % 3600) / 60);
    const secs = remainingTime % 60

    const h = hrs < 10 ? '0' + hrs : hrs;
    const m = mins < 10 ? '0' + mins : mins;
    const s = secs < 10 ? '0' + secs : secs;

    if (remainingTime === 0 && isPlaying) {
        return (
            <Animated.Text style={{ color: animatedColor, fontFamily: 'lato-regular', fontSize: 32, }}>
                Time's up!
            </Animated.Text>
        )
    }
    return (
        <Animated.Text style={{ color: animatedColor, fontFamily: 'lato-regular', fontSize: 32, }}>
            {h + ':' + m + ':' + s}
        </Animated.Text>
    )
}

const PlayAndPauseButton = ({ isPlaying, setIsPlaying, duration }) => {
    if (duration === 0 || !isPlaying) {
        return (
            <AntDesign
                name="play"
                size={32}
                color="blue"
                // onPress={() => { setIsPlaying(prev => !prev); setTimeSelectionVisible(prev => prev ? !prev : prev); }}
                onPress={duration === 0 ? () => { } : () => { setIsPlaying(prev => !prev); }}
                style={duration === 0 ? { opacity: .5 } : { opacity: 1 }}
            />
        )
    } else {
        return (
            <AntDesign
                name="pausecircle"
                size={32}
                color="blue"
                onPress={() => { setIsPlaying(prev => !prev); }}
            />
        )
    }
}

const RestartButton = ({ isPlaying, setIsPlaying, duration, setKey, }) => {
    // setIsPlaying(prev => !prev); setTimeSelectionVisible(prev => !prev);
    return (
        <Ionicons
            name="refresh"
            size={32}
            color="black"
            onPress={duration === 0
                ? () => { }
                : !isPlaying
                    ? () => { setKey((prevKey) => prevKey + 1);  }
                    : () => { setKey((prevKey) => prevKey + 1);setIsPlaying(prev => !prev);  }
            }
            style={duration === 0 ? { opacity: .5 } : { opacity: 1 }}
        />
    )
}

export default function TimerModal({
    isOpen,
    setTimerModalOpen,
    // setTimerModalOpen2,
    // setKey,
    // setIsPlaying,
    // setHours,
    // setMinutes,
    // setSeconds,
    // key3,
    // isPlaying,
    // hours,
    // minutes,
    // seconds,
}) {
    const [key, setKey] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const duration = 3600 * hours + 60 * minutes + seconds;
    const forceUpdateAfter = (func) => val => {
        func(val);
        setKey(prev => prev + 1);
    };
    // const timeSelectionOptions = [
    //     { type: 'hours', initialValue: , onChange: forceUpdateAfter(setHours) }
    // ];

    return (
        <Provider>
            <Portal>
                <Modal
                    visible={isOpen}
                    onDismiss={() => { setTimerModalOpen(false); }}
                    contentContainerStyle={styles.timerModalContainer}
                >
                    <View style={{ alignSelf: 'center' }}>
                        <CountdownCircleTimer
                            key={key}
                            isPlaying={isPlaying}
                            duration={duration}
                            colors={[
                                ['#004777', 0.4],
                                ['#F7B801', 0.4],
                                ['#A30000', 0.2],
                            ]}
                        >
                            {renderTime(isPlaying)}
                        </CountdownCircleTimer>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <TimeSelection
                            type='hours'
                            initialValue={hours}
                            onChange={forceUpdateAfter(setHours)}
                        />
                        <TimeSelection
                            type='minutes'
                            initialValue={minutes}
                            onChange={forceUpdateAfter(setMinutes)}
                        />
                        <TimeSelection
                            type='seconds'
                            initialValue={seconds}
                            onChange={forceUpdateAfter(setSeconds)}
                        />
                        {[]}
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 24, justifyContent: 'space-around' }}>

                        <PlayAndPauseButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} duration={duration} />
                        <RestartButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} duration={duration} setKey={setKey} />

                    </View>
                </Modal>
            </Portal>
        </Provider>
    )
}

const styles = StyleSheet.create({
    timerModalContainer: {
        padding: 20,
        backgroundColor: 'white',
        flex: 0.88
        // alignItems: 'center'
    }
});
