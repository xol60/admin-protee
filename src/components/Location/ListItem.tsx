import { Box, Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import React from 'react'

import Item from './Item';
import { List } from "antd";




const ListItem = (places: any, isLoading: boolean ,center:any,setCenter:any) => {
  

  if (!isLoading)
    return (
      <Flex
        direction={"column"}
        bg={"whiteAlpha.900"}
        width={"37vw"}
        height="100vh"
        position={"absolute"}
        left={0}
        top={0}
        zIndex={1}
        overflow="hidden"
        px={2}
      >
        <Box padding="6" boxShadow="lg" bg="white" mt={16}>
          <SkeletonCircle size="10" />

        </Box>
        <Box padding="6" boxShadow="lg" bg="white" mt={3}>
          <SkeletonCircle size="10" />

        </Box>
        <Box padding="6" boxShadow="lg" bg="white" mt={3}>
          <SkeletonCircle size="10" />

        </Box>
        <Box padding="6" boxShadow="lg" bg="white" mt={3}>
          <SkeletonCircle size="10" />

        </Box>
        <Box padding="6" boxShadow="lg" bg="white" mt={3}>
          <SkeletonCircle size="10" />

        </Box>
      </Flex>
    );

  return (
    <Flex
      direction={"column"}
      bg={"whiteAlpha.900"}
      width={"37vw"}
      height="100vh"
      position={"absolute"}
      left={0}
      top={0}
      zIndex={1}
      overflow="hidden"
      px={2}
    >
      <Flex bg={'white'} overflowY={"scroll"} mt={60} direction={"column"}>
        <List
          className="demo-loadmore-list"

          itemLayout="horizontal"

          dataSource={places.places}
          renderItem={(item) => (
            <Item i={item} center={center} setCenter={setCenter} ></Item>

          )}
        />




      </Flex>
    </Flex>
  )
}

export default ListItem
