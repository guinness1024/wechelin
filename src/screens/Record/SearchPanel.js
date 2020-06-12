import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, View} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import SearchForm from './SearchForm';
import RecordForm from './RecordForm';
import PlaceDetail from './PlaceDetail';
import ManualAddForm from './ManualAddForm';

export const SLIDE_BOTTOM = 120;
export const SLIDE_MIDDLE = 300;

const containerStyle = {
  zIndex: 1,
  flex: 0.9,
  backgroundColor: '#FFFFFF',
  borderRadius: 15,
  paddingTop: 5,
  paddingRight: 10,
  paddingLeft: 10,
};

function SearchPanel({modifyInfo}) {
  const {height} = Dimensions.get('window');
  // iPhone Height: 896 / 812 / 736 / 667 / 568
  const SLIDE_TOP = height - (
    height > 800 ?
      150
      :
      height > 700 ?
        90
        :
        80
  );
  
  const [tab, setTab] = useState('SearchForm');
  const [allowDrag, setAllowDrag] = useState(true);
  
  const slideRef = useRef(null);
  
  useEffect(() => {
    if (!modifyInfo) {
      return;
    }
    
    setAllowDrag(false);
    setTab('RecordForm');
    slideRef.current.show(SLIDE_TOP);
  }, [modifyInfo]);
  
  useEffect(() => {
    slideRef.current.show(SLIDE_MIDDLE);
  }, []);
  
  return (
    <SlidingUpPanel
      ref={slideRef}
      draggableRange={{bottom: SLIDE_BOTTOM, top: SLIDE_TOP}}
      snappingPoints={[SLIDE_BOTTOM, SLIDE_MIDDLE, SLIDE_TOP]}
      allowDragging={allowDrag}
      friction={2}
      containerStyle={{zIndex: 100}}
    >
      <View style={containerStyle}>
        {
          tab === 'SearchForm' && (
            <SearchForm
              setAllowDrag={setAllowDrag}
              setTab={setTab}
              slideRef={slideRef}
            />
          )
        }
        {
          tab === 'ManualAddForm' && (
            <ManualAddForm
              setAllowDrag={setAllowDrag}
              setTab={setTab}
              SLIDE_TOP={SLIDE_TOP}
              slideRef={slideRef}
            />
          )
        }
        {
          tab === 'PlaceDetail' && (
            <PlaceDetail
              setAllowDrag={setAllowDrag}
              setTab={setTab}
              SLIDE_TOP={SLIDE_TOP}
              slideRef={slideRef}
            />
          )
        }
        {
          tab === 'RecordForm' && (
            <RecordForm
              setAllowDrag={setAllowDrag}
              setTab={setTab}
              slideRef={slideRef}
            />
          )
        }
      </View>
    </SlidingUpPanel>
  );
}

export default SearchPanel;