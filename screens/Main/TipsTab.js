import React, {useState} from 'react';
import {Linking, TouchableOpacity, View} from 'react-native';
import appContext from "../../utils/context";
import RouteGuard from "../../navigation/RouteGuard";
import Container from "../../components/Container";
import TipsHe from "../../assets/tips/he";
import TipsEn from "../../assets/tips/en";
import i18n from 'i18n-js';
import Text from "../../components/Text";
import Colors from "../../constants/Colors";
import localization from "../../utils/localization";
import {marginStyle} from "../../constants/Styles";
import YoutubePlayer from 'react-native-youtube-iframe';
import Loading from "../../components/Loading";

let Tips = TipsEn;
if (i18n.locale === "he") {
    Tips = TipsHe;
}

const YoutubeVideo = ({videoId}) => {
    const [isReady, setReady] = useState(false);
    return <View>
        {
            !isReady && <Loading style={{height: 200, padding: 20}}/>
        }
        <YoutubePlayer
            webViewStyle={marginStyle(5, 'top')}
            height={isReady ? 200 : 0}
            width="100%"
            videoId={videoId}
            volume={50}
            playbackRate={1}
            onReady={() => setReady(true)}
            initialPlayerParams={{
                cc_lang_pref: "us",
                showClosedCaptions: true
            }}
        />
    </View>
};

const TipBody = ({type, url, text}) => {
    switch (type) {
        case "video":
            return <YoutubeVideo videoId={url}/>;
        case "text":
            return <Text>{text}</Text>;
        case "link":
            return <TouchableOpacity activeOpacity={1} onPress={async () => await Linking.openURL(url)}>
                <Text color={Colors.purple} underline>{localization('link')}</Text>
            </TouchableOpacity>;
    }
    return <View/>;
};

const Tip = ({tip}) => {
    const {type, title, url, text} = tip;
    return <View style={marginStyle(10, 'top')}>
        <Text bold>{title}</Text>
        <TipBody type={type} url={url} text={text}/>
    </View>
};

const TipsTab = ({navigation}) => {
    RouteGuard(navigation);

    return <Container widthPercentage={90} style={marginStyle(10, 'bottom')}>
        <Text color={Colors.purple} size={13}>{localization('tipsTitle')}</Text>
        {
            Tips.map((tip, index) => <Tip key={index} tip={tip}/>)
        }
    </Container>
};

const {Consumer} = appContext;

export default (props) => <Consumer>
    {
        context => <TipsTab {...props} {...context}/>
    }
</Consumer>
