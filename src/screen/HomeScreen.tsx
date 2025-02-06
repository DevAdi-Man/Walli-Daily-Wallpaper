import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {theme} from '../styles/theme';
import {hp, wp} from '../helper/common';
import Categories from '../components/categories';
import {apiCall} from '../api';
import ImagesGrid from '../components/ImagesGrid';
import {debounce} from 'lodash';
import FliterModel from '../components/FliterModel';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {ActivityIndicator} from 'react-native';




var page = 1;
export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [images, setImages] = useState<any[]>([]);
  const {top} = useSafeAreaInsets();
  const [filters, setFilters] = useState<Record<string, any>>({});
  const scrollRef = useRef<ScrollView>(null);
  const [isEndReached, setIsEndReached] = useState(false);

  const paddingTop = top > 0 ? top + 10 : 30;
  const searchInputRef = useRef<TextInput>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);


  const handleChangeCategory = (cat: any) => {
    setActiveCategory(cat);
    clearSearch();
    setImages([]);
    page = 1;
    let param: {page: number; category?: string; q?: string} = {
      page,
      ...filters,
    };
    if (cat) {
      param.category = cat;
    }
    fetchImages(param, false);
  };

  const fetchImages = async (
    parma: {page: number; q?: string} = {page: 1},
    append = true,
  ) => {
    const res = await apiCall(parma);
    if (res.success && res?.data?.hits) {
      if (append) {
        setImages([...images, ...res.data.hits]);
      } else {
        setImages([...res.data.hits]);
      }
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSearch = useCallback((text: any) => {
    console.log('search for:', text);
    setSearch(text); // Update search state to keep input controlled
    if (text.length > 2) {
      //search for this text
      page = 1;
      setImages([]);
      setActiveCategory(''); // reset the category while searching
      fetchImages({page, q: text, ...filters}, false);
    }
    if (text == '') {
      //reset result
      page = 1;
      setImages([]);
      setActiveCategory(''); // reset the category while searching
      searchInputRef?.current?.clear();
      fetchImages({page, ...filters}, false);
    }
  }, []);

  // Cleanup debounce function on unmount
  const debouncedSearch = useRef(debounce(handleSearch, 400)).current;
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  //clear search
  const clearSearch = () => {
    setSearch('');
  };
  //open and close filter model
  const openFilterModel = () => {
    bottomSheetModalRef?.current?.present();
  };
  const closeFilterModel = () => {
    bottomSheetModalRef?.current?.close();
  };

  //applying filters
  const applyFilter = () => {
    if (filters) {
      page = 1;
      setImages([]);
      let param: {page: number; category?: string; q?: string} = {
        page,
        ...filters,
      };
      if (activeCategory) {
        param.category = activeCategory;
      }
      if (search) {
        param.q = search;
      }
      fetchImages(param, false);
    }
    closeFilterModel();
  };
  //reset filters
  const resetFilter = () => {
    if (filters) {
      page = 1;
      setFilters({});
      setImages([]);
      let param: {page: number; category?: string; q?: string} = {
        page,
      };
      if (activeCategory) {
        param.category = activeCategory;
      }
      if (search) {
        param.q = search;
      }
      fetchImages(param, false);
    }
    closeFilterModel();
  };

  //clearfilter
  const clearThisFilter = (filterName:any) => {
    let filterz = { ...filters };
    delete filterz[filterName];
    setFilters({ ...filterz });
    page = 1;
    setImages([]);
    let param: {page: number; category?: string; q?: string} = {
      page,
      ...filterz,
    };
    if (activeCategory) {
      param.category = activeCategory;
    }
    if (search) {
      param.q = search;
    }
    fetchImages(param, false);
  };
  //handle scroll
  const handleScroll = (event:any) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const bottomPosition = contentHeight - scrollViewHeight;

    if (scrollOffset > bottomPosition - 1) {
      if (!isEndReached) {
        setIsEndReached(true);
        console.log('reached end of the scroll bar');
        //fetch more images
        ++page;
        let param: {page: number; category?: string; q?: string} = {
          page,
          ...filters,
        };
        if (activeCategory) {
          param.category = activeCategory;
        }
        if (search) {
          param.q = search;
        }
      fetchImages(param, true);

      }
    } else if (isEndReached) {
      setIsEndReached(false);
    }
  };
  //handle scroll to top
  const handleScrollToTop = () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  return (
    <View style={[styles.container, {paddingTop}]}>
      {/* Header */}
      <View style={styles.headers}>
        <Pressable onPress={handleScrollToTop}>
          <Text style={styles.title}>Walli</Text>
        </Pressable>
        <Pressable onPress={openFilterModel}>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.neutral(0.7)}
          />
        </Pressable>
      </View>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={5} //how often scroll event will fire whiel scrolling (in ms)
        ref={scrollRef}
        contentContainerStyle={styles.scrollableContainer}>
        {/* Search Screen */}
        <View style={styles.searchBar}>
          <View style={styles.searchIcons}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.4)}
            />
          </View>
          <TextInput
            value={search}
            ref={searchInputRef}
            onChangeText={text => {
              setSearch(text); // Update search state instantly to prevent input from clearing
              debouncedSearch(text); // Call debounced function
            }}
            placeholder="search for photos.."
            style={styles.searchInput}
          />
          {search && (
            <Pressable
              onPress={() => handleSearch('')}
              style={styles.closeIcons}>
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.5)}
              />
            </Pressable>
          )}
        </View>

        {/* categories */}
        <View style={styles.categories}>
          <Categories
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        {/* filters */}
        {filters && (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersStyles}>
              {Object.keys(filters).map((key, _index) => {
                return (
                  <View key={key} style={styles.filterItems}>
                    {
                      // eslint-disable-next-line eqeqeq
                      key == 'color' ? (
                        // eslint-disable-next-line react-native/no-inline-styles
                        <View
                          style={{
                            height: 20,
                            width: 30,
                            borderRadius: 7,
                            backgroundColor: filters[key],
                          }}
                        />
                      ) : (
                        <Text style={styles.filtersItemsText}>
                          {filters[key]}
                        </Text>
                      )
                    }
                    <Pressable
                      style={styles.filterCloseIcons}
                      onPress={() => clearThisFilter(key)}>
                      <Ionicons
                        name="close"
                        size={14}
                        color={theme.colors.neutral(0.9)}
                      />
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* images masonary grid */}
        <View>
          {images.length > 0 && (
            <ImagesGrid images={images} />
          )}
        </View>

        {/* Loading */}
        <View
          style={{marginBottom: 70, marginTop: images.length > 0 ? 10 : 70}}>
          <ActivityIndicator size="large" />
        </View>
      </ScrollView>

      {/* Filter Model */}
      <FliterModel
        bottomSheetModalRef={bottomSheetModalRef}
        filters={filters}
        setFilters={setFilters}
        onClose={closeFilterModel}
        onApply={applyFilter}
        onReset={resetFilter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  headers: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeight.semiBold,
    color: theme.colors.neutral(0.9),
  },
  scrollableContainer: {
    gap: 15,
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.grayBg,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,
  },
  searchIcons: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcons: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  },
  categories: {
    //
  },
  filtersStyles: {
    paddingHorizontal: wp(4),
    gap:10,
  },
  filterItems: {
    backgroundColor: theme.colors.grayBg,
    padding: 8,
    flexDirection: 'row',
    borderRadius: theme.radius.xs,
    gap: 10,
    paddingHorizontal: 10,
    alignItems:'center',
  },
  filtersItemsText: {
    fontSize:hp(1.9),
  },
  filterCloseIcons: {
    backgroundColor: theme.colors.neutral(0.2),
    padding: 4,
    borderRadius:7,
  },
});

