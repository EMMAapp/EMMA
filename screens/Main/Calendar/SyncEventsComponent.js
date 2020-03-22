import React, {useState} from "react";
import {TouchableOpacity, View} from "react-native";
import localization from "../../../utils/localization";
import _ from 'lodash'
import {addOrRemove} from "../../../utils/utils";
import shortid from 'shortid';
import Text from "../../../components/Text";
import Checkbox from "../../../components/Checkbox";
import Colors from "../../../constants/Colors";
import styled from "styled-components";
import {marginStyle, paddingStyle} from "../../../constants/Styles";
import ButtonPrimary from "../../../components/ButtonPrimary";
import Button from "../../../components/Button";
import Row from "../../../components/Row";
import Image from "../../../components/Image";
import Divider from "../../../components/Divider";

const StyledImage = styled(Image)`
border-color: #e07a83;
border-width: 2px;
`;

export default ({dismiss, potentialSyncEvents, syncEventsWithNewPeriod}) => {
    const [eventIdsToSync, setEventIdsToSync] = useState([]);

    const SyncRow = ({mainTitle, subTitle, enabled, onToggle}) => (
        <Row style={{width: '100%'}}>
            <Checkbox value={enabled} setValue={(enabled) => onToggle(enabled)}/>
            <TouchableOpacity activeOpacity={1} onPress={() => onToggle(!enabled)}>
                <Row>
                    <Text color={Colors.purple} bold>{mainTitle}</Text>
                    <Text>{subTitle}</Text>
                </Row>
            </TouchableOpacity>
        </Row>
    );

    const toggleAll = (enabled) => {
        if (enabled) {
            setEventIdsToSync(potentialSyncEvents.map(potential => potential.event.id));
        }
        else {
            setEventIdsToSync([]);
        }
    };

    const toggleEvent = (event) => {
        setEventIdsToSync(addOrRemove(eventIdsToSync, event.id));
    };

    return <View>
        <Row center>
            <StyledImage name='wonder' width={80} height={80} circled style={marginStyle(10, 'bottom')}/>
        </Row>
        <Text alignCenter bold color={Colors.purple} size={13}>
            {localization('syncEventsTitle')}
        </Text>
        <Text alignCenter size={10} style={[paddingStyle(5, 'top'), paddingStyle(15, 'bottom')]}>
            {localization('syncEventsSubTitle')}
        </Text>

        {
            potentialSyncEvents.length > 1 ?
                <View style={{width: '100%'}}>
                    <SyncRow
                        subTitle={localization('selectAllEvents')}
                        enabled={eventIdsToSync.length === potentialSyncEvents.length}
                        onToggle={toggleAll}
                    />
                    <Divider/>
                </View>
                : null
        }
        {
            potentialSyncEvents.map(potential =>
                <SyncRow
                    key={shortid.generate()}
                    mainTitle={potential.event.checkup ? potential.event.checkup : potential.event.medication}
                    subTitle={potential.count > 1 ? null : ` - ${potential.count} ${localization('eventsCountSuffix')}`}
                    enabled={_.includes(eventIdsToSync, potential.event.id)}
                    onToggle={() => toggleEvent(potential.event)}
                />
            )
        }

        <Row center>
            <ButtonPrimary
                style={[marginStyle(15, 'top')]}
                onPress={async () => {
                    dismiss();
                    await syncEventsWithNewPeriod(eventIdsToSync);
                }}>
                {localization('sync')}
            </ButtonPrimary>
        </Row>
        <Row center>
            <Button
                style={[marginStyle(5, 'top')]}
                onPress={() => dismiss()}>
                {localization('dontSync')}
            </Button>
        </Row>

        <Text alignCenter color={Colors.gray} size={7} style={paddingStyle(10, 'top')}>
            {localization('syncEventsNote')}
        </Text>
    </View>
}
