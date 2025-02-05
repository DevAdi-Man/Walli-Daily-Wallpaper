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

var page = 1;
export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [images, setImages] = useState<any[]>([]);
  const {top} = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const searchInputRef = useRef<TextInput>(null);

  const handleChangeCategory = (cat: any) => {
    setActiveCategory(cat);
    clearSearch();
    setImages([]);
    page = 1;
    let param: { page: number; category?: string } = {
      page,
    };
    if (cat) {
      param.category = cat;
    }
    fetchImages(param, false);
  };

  const fetchImages = async (
    parma: {page: number; q?: string} = {page: 1},
    append = false,
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
      fetchImages({page, q: text});
    }
    if (text == '') {
      //reset result
      page = 1;
      setImages([]);
      setActiveCategory('');// reset the category while searching
      searchInputRef?.current?.clear();
      fetchImages({page});
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
  console.log('Active catorgory : ', activeCategory);
  return (
    <View style={[styles.container, {paddingTop}]}>
      {/* Header */}
      <View style={styles.headers}>
        <Pressable>
          <Text style={styles.title}>Walli</Text>
        </Pressable>
        <Pressable>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.neutral(0.7)}
          />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.scrollableContainer}>
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
            <Pressable onPress={()=> handleSearch('')} style={styles.closeIcons}>
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

        {/* images masonary grid */}
        <View>{images.length > 0 && <ImagesGrid images={images} />}</View>
      </ScrollView>
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
});
