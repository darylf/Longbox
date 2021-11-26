import {
  Box,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineCloseCircle as CloseIcon } from "react-icons/ai";
import { FiChevronDown as ChevronDownIcon } from "react-icons/fi";
import { GiHamburgerMenu as HamburgerIcon } from "react-icons/gi";
import { UserActions } from "../features/auth/components/UserDropDownMenu";

interface NavItem {
  label: string;
  children?: Array<NavItem>;
  url?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "My Collection",
    url: "/my-collection",
  },
  {
    label: "Explore",
    children: [
      {
        label: "Browse Publishers",
        url: "/publishers",
      },
      {
        label: "Browse Creators",
        url: "/creators",
      },
      {
        label: "Browse Books",
        url: "/series",
      },
    ],
  },
  {
    label: "Trending",
    url: "/trending",
  },
  {
    label: "About",
    url: "/about",
  },
];

const DesktopSubNav = ({ label, url }: NavItem) => {
  return (
    <Link
      href={url}
      role="group"
      display="block"
      p={2}
      rounded="md"
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction="row" align="center">
        <Box>
          <Text
            transition="all .3s ease"
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
        </Box>
      </Stack>
    </Link>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.url}
                fontSize="sm"
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
                {navItem.children && (
                  <Icon as={ChevronDownIcon} ml="0.5em" w={4} h={4} />
                )}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow="xl"
                bg={popoverContentBgColor}
                p={4}
                rounded="xl"
                minW="sm"
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav
                      key={child.label}
                      label={`${child.label}`}
                      url={child.url}
                    />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, url }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={url ?? "#"}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition="all .25s ease-in-out"
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
            color="red"
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align="start"
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.url}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem
          key={navItem.label}
          label={`${navItem.label}`}
          url={navItem.url}
        />
      ))}
    </Stack>
  );
};

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align="center"
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily="heading"
            color={useColorModeValue("gray.800", "white")}
          >
            {/* <svg
              id="logo-9"
              width="152"
              height="19"
              viewBox="0 0 152 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M75.693 16.374H70.573V2.686H75.693V16.374ZM71.073 15.874H75.193V3.186H71.073V15.874ZM82.817 16.374H77.8V2.686H88.282C89.7836 2.5644 91.279 2.98597 92.496 3.874C93.0199 4.35331 93.426 4.94719 93.6825 5.60929C93.9391 6.2714 94.0392 6.98383 93.975 7.691C94.0498 8.91297 93.6609 10.1182 92.886 11.066C91.969 12.118 90.443 12.66 88.351 12.679C87.824 12.693 83.875 12.679 82.82 12.679L82.817 16.374ZM78.297 15.874H82.317V12.174H82.568C82.619 12.174 87.746 12.19 88.339 12.174C90.288 12.157 91.689 11.674 92.508 10.731C93.1978 9.87345 93.5404 8.78815 93.468 7.69C93.5295 7.05637 93.4442 6.41709 93.2188 5.82174C92.9933 5.22639 92.6338 4.69097 92.168 4.257C91.0396 3.4471 89.659 3.06693 88.275 3.185H78.3L78.297 15.874ZM87.22 9.604H82.283V5.878H87.253C87.6053 5.82932 87.9642 5.87044 88.2963 5.99753C88.6285 6.12463 88.9232 6.33358 89.153 6.605C89.3615 6.95194 89.4598 7.35398 89.435 7.758C89.4537 8.1331 89.3727 8.50647 89.2 8.84C88.9629 9.12588 88.6562 9.34595 88.3094 9.47905C87.9627 9.61215 87.5875 9.6538 87.22 9.6V9.604ZM82.783 9.104H87.22C88.04 9.104 88.548 8.933 88.773 8.581C88.8969 8.32515 88.953 8.04176 88.936 7.758C88.9579 7.46006 88.8933 7.16214 88.75 6.9L88.744 6.891C88.506 6.541 88.033 6.378 87.253 6.378H82.783V9.104ZM103.1 16.576C98.61 16.576 95.93 15.461 94.909 13.168C94.7419 12.7251 94.6285 12.2638 94.571 11.794L94.527 11.506H99.869L99.904 11.716C99.9451 11.9292 100.036 12.1299 100.168 12.302C100.379 12.557 101.083 12.985 103.419 12.985C106.227 12.985 106.227 12.492 106.227 12.227C106.227 11.78 105.902 11.627 103.612 11.383L103.177 11.342C102.315 11.261 101.225 11.158 100.727 11.115C96.527 10.735 94.652 9.43 94.652 6.885C94.652 4.212 97.843 2.485 102.782 2.485C106.811 2.485 109.407 3.547 110.496 5.644C110.754 6.13178 110.928 6.65999 111.009 7.206L111.044 7.487H105.696L105.674 7.261C105.653 7.08438 105.578 6.91869 105.458 6.787C105.258 6.519 104.626 6.076 102.664 6.076C100.255 6.076 99.923 6.384 99.923 6.716C99.923 7.159 100.684 7.316 103.123 7.577C104.14 7.66 105.775 7.828 106.335 7.896C109.856 8.278 111.427 9.551 111.427 12.025C111.428 14.1 109.983 16.576 103.1 16.576ZM95.111 12.006C95.1611 12.3358 95.2473 12.659 95.368 12.97C96.298 15.059 98.828 16.076 103.1 16.076C106.672 16.076 110.931 15.376 110.931 12.025C110.931 9.832 109.541 8.746 106.282 8.393C105.722 8.325 104.097 8.158 103.082 8.074C100.482 7.792 99.425 7.642 99.425 6.716C99.425 5.758 100.564 5.576 102.666 5.576C104.327 5.576 105.4 5.876 105.855 6.481C105.979 6.63005 106.073 6.80195 106.131 6.987H110.465C110.378 6.60025 110.24 6.22669 110.055 5.876C109.055 3.957 106.612 2.985 102.784 2.985C98.149 2.985 95.154 4.516 95.154 6.885C95.154 9.145 96.835 10.261 100.773 10.617C101.273 10.66 102.362 10.763 103.226 10.845L103.664 10.886C105.791 11.11 106.729 11.25 106.729 12.227C106.729 13.279 105.516 13.485 103.421 13.485C101.483 13.485 100.259 13.194 99.786 12.621C99.6402 12.4383 99.5302 12.2296 99.462 12.006H95.111ZM120.927 16.559C115.707 16.559 112.827 14.448 112.827 10.614V2.686H117.879V10.614C117.879 11.929 119.056 12.683 121.107 12.683C123.067 12.683 124.284 11.896 124.284 10.631V2.686H129.284V11.034C129.289 14.545 126.24 16.559 120.924 16.559H120.927ZM113.327 3.186V10.614C113.327 15.352 118.085 16.059 120.927 16.059C123.865 16.059 128.792 15.406 128.792 11.034V3.186H124.792V10.631C124.792 12.181 123.348 13.183 121.115 13.183C118.781 13.183 117.387 12.223 117.387 10.614V3.186H113.327ZM150.472 16.374H145.704V10.194L143 16.374H138.841L136.165 10.206V16.374H131.38V2.686H137.674L140.944 10.233L144.372 2.686H150.478L150.472 16.374ZM146.204 15.874H149.972V3.186H144.69L140.928 11.465L137.342 3.186H131.876V15.874H135.661V7.8L139.161 15.877H142.661L146.198 7.812L146.204 15.874ZM6.054 2.936H1.5V16.124H14.084V12.613H6.054V2.936ZM23.276 2.636C17.463 2.636 14.406 5.391 14.406 9.436C14.406 14.006 17.615 16.324 23.276 16.324C29.508 16.324 32.129 13.636 32.129 9.436C32.129 5.171 29.172 2.634 23.276 2.634V2.636ZM23.259 6.063C23.6547 6.06114 24.0502 6.08418 24.443 6.132L19.352 11.223C19.1111 10.6781 18.9936 10.0866 19.008 9.491C19.008 7.422 20.05 6.061 23.259 6.061V6.063ZM23.276 12.951C22.8947 12.9527 22.5137 12.9313 22.135 12.887L27.235 7.787C27.4669 8.3229 27.5779 8.90333 27.56 9.487C27.56 11.5 26.6 12.949 23.276 12.949V12.951ZM41.152 11.151H45.839C45.77 11.4763 45.6262 11.781 45.419 12.041C44.4473 12.8326 43.2072 13.2178 41.958 13.116C41.3292 13.1833 40.6934 13.1146 40.0935 12.9146C39.4936 12.7147 38.9436 12.3881 38.481 11.957C38.0071 11.2619 37.782 10.4271 37.842 9.588C37.7653 8.70874 38.0101 7.83152 38.531 7.119C39.186 6.379 40.295 6.06 41.925 6.06C42.9621 5.97413 43.9979 6.24048 44.865 6.816C45.1383 7.03308 45.3426 7.32491 45.453 7.656H49.8C49.7684 7.11047 49.6372 6.57533 49.413 6.077C48.372 3.96 45.952 2.7 41.837 2.7C38.258 2.7 35.856 3.792 34.529 5.439C33.6526 6.62836 33.2027 8.07844 33.252 9.555C33.1953 11.065 33.6336 12.5521 34.5 13.79C35.811 15.49 38.146 16.326 40.952 16.326C42.8175 16.4561 44.6703 15.9336 46.193 14.848L46.311 16.124H49.922V8.312H41.152V11.151ZM60.171 2.633C54.359 2.633 51.301 5.388 51.301 9.433C51.301 14.003 54.509 16.321 60.171 16.321C66.404 16.321 69.025 13.633 69.025 9.433C69.025 5.171 66.068 2.634 60.171 2.634V2.633ZM60.155 6.06C60.5403 6.05886 60.9253 6.0809 61.308 6.126L56.237 11.2C56.0036 10.6611 55.89 10.0781 55.904 9.491C55.9 7.422 56.946 6.061 60.155 6.061V6.06ZM60.171 12.948C59.7796 12.9497 59.3885 12.9269 59 12.88L64.117 7.762C64.3577 8.30503 64.4729 8.89532 64.454 9.489C64.456 11.5 63.5 12.949 60.171 12.949V12.948Z"
                className="ccustom"
                fill="#394149"
              ></path>
            </svg> */}
            LONGBOX
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          <UserActions />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
