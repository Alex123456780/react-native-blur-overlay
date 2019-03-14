import {
    View,
    Platform,
    requireNativeComponent,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import React, {Component,} from 'react';
import PropTypes from 'prop-types'

const iface = {
    name: 'BlurView',
    propTypes: {
        ...View.propTypes,
        brightness: PropTypes.any,
        radius: PropTypes.number,
        downsampling: PropTypes.number,
        blurStyle: PropTypes.string,
        vibrant: PropTypes.bool,
    }
};

const RCTSajjadBlurOverlay = Platform.select({
  ios: () => requireNativeComponent('SajjadBlurOverlay', iface),
  android: () => requireNativeComponent('RCTSajjadBlurOverlay', iface),
})();

export default class BlurOverlay extends Component {
    state = {
        showBlurOverlay: false,
    }

    openOverlay = () => {
       this.setState({
           showBlurOverlay: true,
       });
    }

    closeOverlay = () => {
        this.setState({showBlurOverlay: false});
    }

    render() {
        const { children } = this.props;
        return (
            this.state.showBlurOverlay ?
            <View
                style={styles.style}
            >
            <TouchableWithoutFeedback style={styles.style} onPress={this.closeOverlay}>
                <RCTSajjadBlurOverlay
                    {...this.props}
                    style={[this.props.customStyles,styles.style]}
                >
                <View
                    style={[this.props.customStyles,styles.style]}
                >
                    {children}
                </View>
                </RCTSajjadBlurOverlay>
            </TouchableWithoutFeedback>
            </View>
            :
                null
        );
    }
}

const styles = StyleSheet.create({
    style: {
        position: 'absolute',
        flex: 1,
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        //  resizeMode: 'cover',
        width: null,
        height: null,
        zIndex: 999,
    },
});