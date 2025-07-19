# VE-EDU-LAB - React TypeScript Frontend for VirtuEducate

![React](https://img.shields.io/badge/react-18.3.1-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-4.9.5-blue.svg)
![Redux Toolkit](https://img.shields.io/badge/redux_toolkit-2.3.0-purple.svg)
![Tailwind CSS](https://img.shields.io/badge/tailwind_css-3.4.14-blue.svg)
![RTK Query](https://img.shields.io/badge/rtk_query-✓-purple.svg)
![React Hook Form](https://img.shields.io/badge/react_hook_form-7.59.0-orange.svg)
![Framer Motion](https://img.shields.io/badge/framer_motion-12.0.6-pink.svg)
![React Router](https://img.shields.io/badge/react_router-6.27.0-red.svg)
![Recharts](https://img.shields.io/badge/recharts-2.13.2-green.svg)
![Lucide React](https://img.shields.io/badge/lucide_react-0.454.0-blue.svg)
![Testing Library](https://img.shields.io/badge/testing_library-✓-red.svg)
![ESLint](https://img.shields.io/badge/eslint-8.57.1-blue.svg)
![Prettier](https://img.shields.io/badge/prettier-3.3.3-yellow.svg)

## Overview

This React TypeScript frontend represents the primary user interface layer of the VirtuEducate ecosystem, handling everything from course discovery and enrollment to interactive assessments and study management. The codebase showcases enterprise-level frontend architecture patterns with a focus on scalability, maintainability, and performance optimization.

![VirtuEducate Platform Demo](./public/virtu.gif)

## For the backend code, see: https://github.com/Virtu-E/ve-edu-vault

## Project Context

The following documentation illustrates the architectural thinking, design patterns, and technical decisions that drive scalable frontend development in complex projects.

The code is not complete for IP reasons. For a live demonstration of the platform in action, please see:
- 🔗 **Live Application**: [Coming Soon - Deployed Instance]

---

# Building Performant React Applications: Architecture Principles

To build a performant, scalable React application that can handle complex educational workflows, you need to consider several key factors. Here's how we implement each one:

## 1. 🏗️ Scalable File Organization

### The Challenge
Most React projects start with a component-centric structure that becomes unmaintainable as features grow:

```
❌ Traditional Structure - Hard to Scale
src/
├── components/
│   ├── SearchInput.tsx
│   ├── SearchDropdown.tsx
│   ├── CourseCard.tsx
│   ├── UserProfile.tsx
│   └── AssessmentForm.tsx
├── hooks/
├── utils/
└── pages/
```

**Problems:**
- Features scattered across directories
- Hard to find related code
- Difficult team collaboration
- Merge conflicts increase

### Our Solution: Feature-Based Architecture

```
✅ Feature-Based Structure - Scales with Teams
src/
├── app/                     # 🏪 Global Application Configuration
│   ├── store.tsx           # Redux store setup
│   ├── hooks.tsx           # Pre-typed Redux hooks
│   └── types.ts            # Global type definitions
│
├── core/                    # 🔧 Shared Infrastructure
│   ├── services/           # External integrations
│   │   ├── api.ts          # Base RTK Query API
│   │   ├── ApiService.ts   # HTTP client wrapper
│   │   └── types.ts        # API response types
│   ├── models/             # Domain entities
│   │   ├── courseDetails.models.ts
│   │   ├── search.model.ts
│   │   ├── questions.model.ts
│   │   └── index.ts        # Barrel exports
│   ├── hooks/              # Reusable logic
│   │   ├── useDebounce.ts
│   │   └── useCourseDetails.ts
│   └── utils/              # Pure functions
│
├── features/                # 🎨 Self-Contained Business Features
│   │
│   ├── SearchBar/          # Complete search functionality
│   │   ├── SearchBar.tsx                    # Main orchestrator
│   │   ├── components/                      # Feature UI components
│   │   │   ├── SearchInput/
│   │   │   │   ├── SearchInput.tsx
│   │   │   │   ├── SearchInput.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── SearchDropdown/
│   │   │   │   ├── SearchDropdown.tsx
│   │   │   │   └── index.ts
│   │   │   ├── SearchResultItem/
│   │   │   ├── SearchResultsSection/
│   │   │   └── SearchIcons/
│   │   ├── hooks/                          # Feature business logic
│   │   │   ├── useSearchAPI.ts             # API integration
│   │   │   ├── useSearchDebounce.ts        # Performance optimization
│   │   │   ├── useSearchKeyboard.ts        # Keyboard navigation
│   │   │   └── useClickOutside.ts          # UI interactions
│   │   ├── store/                          # Feature state
│   │   │   ├── search.slice.ts             # Redux slice
│   │   │   ├── search.selectors.ts         # Memoized selectors
│   │   │   └── index.ts                    # Barrel export
│   │   └── index.ts                        # Feature public API
│   │
└── views/                   # 📱 Page-Level Orchestration
    ├── Layout/
    │   ├── Layout.tsx
    │   └── components/
    │       ├── Header/
    │       └── Navigation/
    ├── HomepageView/
    │   └── HomePageView.tsx
    ├── CourseDetailView/
    │   └── CourseDetailView.tsx
    ├── SearchView/
    │   └── SearchView.tsx
    └── MyLearning/
        └── MyLearning.tsx
```

### Implementation Details

#### Path Aliases for Clean Imports

```typescript
// tsconfig.json configuration
{
  "baseUrl": ".",
  "paths": {
    "@features/*": ["src/features/*"],
    "@core/*": ["src/core/*"],
    "@app/*": ["src/app/*"]
  }
}

// config-overrides.js for runtime resolution
const path = require('path')

module.exports = function override(config) {
    config.resolve.alias = {
        ...config.resolve.alias,
        '@features': path.resolve(__dirname, 'src/features'),
        '@core': path.resolve(__dirname, 'src/core'),
        '@app': path.resolve(__dirname, 'src/app'),
    }
    return config
}
```

**See:** [tsconfig.json](src/tsconfig.json) | [config-overrides.js](src/config-overrides.js)

**Before vs After:**
```typescript
// ❌ Fragile relative imports
import { SearchResult } from '../../../core/models/search'
import { useDebounce } from '../../../../core/hooks/useDebounce'

// ✅ Clean, maintainable imports
import { SearchResult } from '@core/models/search'
import { useDebounce } from '@core/hooks/useDebounce'
```

#### Feature Encapsulation Example

```typescript
// src/features/SearchBar/index.ts - Single export point
export { default } from './SearchBar'
export * from './store/search.selectors'
export * from './hooks/useSearchAPI'

// Usage in views - clean and simple
import SearchBar from '@features/SearchBar'
```

**See:** [SearchBar feature structure](src/features/SearchBar/) | [Feature index](src/features/SearchBar/index.ts)

## 2. ⚡ Performance Optimization

### The Challenge
React re-renders can become expensive with complex state management:

```typescript
// ❌ Poor performance - everything re-renders together
const App = () => {
  const [allAppState, setAllAppState] = useState({
    userProfile: null,
    searchTerm: '',
    searchResults: [],
    assessmentState: {},
    courseProgress: {}
  })

  // Any state change triggers ALL component re-renders
  return (
    <div>
      <Header user={allAppState.userProfile} />
      <SearchBar 
        term={allAppState.searchTerm} 
        results={allAppState.searchResults}
        onChange={(term) => setAllAppState({...allAppState, searchTerm: term})}
      />
      <CourseList progress={allAppState.courseProgress} />
    </div>
  )
}
```

### Our Solution: Strategic State Management & Selective Rendering

#### 1. Redux with Selective Subscriptions

```typescript
// Each component only subscribes to its needed state slice
const Header = () => {
  // Only re-renders when user profile changes
  const userProfile = useAppSelector(selectUserProfile)
  return <header>{userProfile?.name}</header>
}

const SearchInput = () => {
  // Only re-renders when search term changes
  const searchTerm = useAppSelector(selectSearchTerm)
  const dispatch = useAppDispatch()
  
  return (
    <input 
      value={searchTerm}
      onChange={(e) => dispatch(setSearchTerm(e.target.value))}
    />
  )
}

const SearchResults = () => {
  // Only re-renders when search results change
  const results = useAppSelector(selectSearchResults)
  return <div>{results.courses.map(course => <CourseCard key={course.id} />)}</div>
}
```

#### 2. Memoized Selectors for Expensive Computations

```typescript
// src/features/SearchBar/store/search.selectors.ts
export const selectAllItems = createSelector(
  [selectSearchResults],
  (results) => {
    // This expensive operation only runs when search results change
    return [
      ...results.courses,
      ...results.topics,
      ...results.subtopics,
      ...results.learning_objectives
    ]
    .sort((a, b) => (b.rank || b.similarity || 0) - (a.rank || a.similarity || 0))
    .slice(0, 50) // Limit for performance
  }
)

// Usage - automatically memoized, only recalculates when needed
const SearchDropdown = () => {
  const allItems = useAppSelector(selectAllItems)
  const hoveredIndex = useAppSelector(selectHoveredIndex)
  
  return (
    <div>
      {allItems.map((item, index) => (
        <SearchResultItem 
          key={item.id}
          item={item}
          isHovered={hoveredIndex === index}
        />
      ))}
    </div>
  )
}
```

**See:** [Search selectors](src/features/SearchBar/store/search.selectors.ts) | [SearchDropdown component](src/features/SearchBar/components/SearchDropdown/SearchDropdown.tsx)

#### 3. Component-Level Memoization

```typescript
// src/features/SearchBar/components/SearchResultItem/SearchResultItem.tsx
const SearchResultItem = memo(({ item, index, isHovered, iconRenderer }) => {
  const dispatch = useAppDispatch()
  
  // This callback is memoized to prevent unnecessary re-renders
  const handleMouseEnter = useCallback(() => {
    dispatch(setHoveredIndex(index))
  }, [index, dispatch])
  
  return (
    <div 
      onMouseEnter={handleMouseEnter}
      className={isHovered ? 'bg-secondary-50 shadow-sm' : 'hover:bg-virtu_grey-50'}
    >
      {iconRenderer()}
      <div className="text-sm font-semibold">{item.name}</div>
    </div>
  )
})
```

**See:** [SearchResultItem component](src/features/SearchBar/components/SearchResultItem/SearchResultItem.tsx)

#### 4. Debounced API Calls

```typescript
// src/features/SearchBar/hooks/useSearchDebounce.ts
export const useSearchDebounce = (delay = 300) => {
  const dispatch = useDispatch()
  const searchTerm = useSelector(selectSearchTerm)

  const debouncedSetSearch = useDebounce((term) => {
    dispatch(setDebouncedSearchTerm(term))
  }, delay)

  useEffect(() => {
    debouncedSetSearch(searchTerm)
  }, [searchTerm, debouncedSetSearch])
}

// Implementation prevents API spam
const SearchBar = () => {
  useSearchAPI()
  useSearchDebounce(300) // Only search 300ms after user stops typing
  
  return <div>{/* Search UI */}</div>
}
```

**See:** [useSearchDebounce hook](src/features/SearchBar/hooks/useSearchDebounce.ts) | [SearchBar main component](src/features/SearchBar/SearchBar.tsx)

## 3. 🔒 Type Safety Throughout

### The Challenge
Runtime errors from undefined properties and incorrect data types:

```typescript
// ❌ No type safety - runtime errors waiting to happen
const SearchResults = ({ results }) => {
  return (
    <div>
      {results.courses.map(course => (
        <div key={course.id}>
          {course.name} {/* What if course.name is undefined? */}
          {course.enrollmentCount} {/* What if this property doesn't exist? */}
        </div>
      ))}
    </div>
  )
}
```

### Our Solution: Comprehensive TypeScript Integration

#### 1. Strict TypeScript Configuration

```json
// tsconfig.json - Zero tolerance for type issues
{
  "compilerOptions": {
    "strict": true,                          // All strict checks enabled
    "noUncheckedIndexedAccess": true,        // Prevent undefined access
    "noFallthroughCasesInSwitch": true,      // Require break statements
    "forceConsistentCasingInFileNames": true, // Cross-platform compatibility
    "exactOptionalPropertyTypes": true       // Strict optional handling
  }
}
```

**See:** [TypeScript configuration](src/tsconfig.json)

#### 2. Domain Model Definitions

```typescript
// src/core/models/search.model.ts
export interface SearchResult {
  courses: CourseSearchResult[]
  topics: TopicSearchResult[]
  subtopics: SubTopicSearchResult[]
  learning_objectives: LearningObjectiveSearchResult[]
  total_results: number
}

export interface CourseSearchResult {
  id: string
  name: string
  course_key: string
  type: 'course'
  rank?: number
  similarity?: number
}

// src/core/models/courseDetails.models.ts
export interface CourseDetails {
  blocks_url: string
  effort: string | null
  end: string
  enrollment_start: string
  enrollment_end: string
  id: string
  media: CourseMedia
  name: string
  number: string
  org: string
  short_description: string
  start: string
  start_display: string
  start_type: string
  pacing: string
  mobile_available: boolean
  hidden: boolean
  invitation_only: boolean
  course_id: string
  overview: string
  is_enrolled: boolean
}
```

**See:** [Search models](src/core/models/search.model.ts) | [Course models](src/core/models/courseDetails.models.ts) | [All models](src/core/models/index.ts)

#### 3. Pre-typed Redux Hooks

```typescript
// src/app/hooks.tsx - Set up once, use everywhere
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

// Usage throughout app - automatic type inference
const SearchInput = () => {
  const searchTerm = useAppSelector(selectSearchTerm) // TypeScript knows this is string
  const isLoading = useAppSelector(selectIsLoading)   // TypeScript knows this is boolean
  const dispatch = useAppDispatch()                   // Fully typed dispatch
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value)) // Type-safe action dispatch
  }
  
  return (
    <input 
      value={searchTerm} 
      onChange={handleChange}
      disabled={isLoading}
    />
  )
}
```

**See:** [Pre-typed Redux hooks](src/app/hooks.tsx) | [Redux store configuration](src/app/store.tsx)

#### 4. Generic API Hook Factory

```typescript
// src/core/hooks/useCourseDetails.ts
export const useCourseDetails = createApiHook<CourseDetails>({
  apiService: edxApiService,
  endpoint: ({ courseId, userName }) => 
    `/api/courses/v1/courses/${encodeURIComponent(courseId)}?username=${userName}`,
  paramKeys: ['courseId', 'userName'], // TypeScript ensures these params are provided
})

// Usage - Fully typed response with error handling
const CourseDetailView = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const { userName } = useAppSelector(selectUserProfile)
  
  const { 
    data: courseDetails, 
    isLoading, 
    error 
  } = useCourseDetails({ courseId, userName })
  
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorBoundary error={error} />
  if (!courseDetails) return <NotFound />
  
  // courseDetails is fully typed as CourseDetails interface
  return (
    <div>
      <h1>{courseDetails.name}</h1>
      <p>{courseDetails.short_description}</p>
      <img src={courseDetails.media.banner_image?.uri_absolute} alt={courseDetails.name} />
    </div>
  )
}
```

**See:** [useCourseDetails hook](src/core/hooks/useCourseDetails.ts) | [Base API service](src/core/services/api.ts)

## 4. 🧩 Component Architecture

### The Challenge
Monolithic components that mix UI rendering with business logic:

```typescript
// ❌ Mixed concerns - hard to test and reuse
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  
  // Debouncing logic mixed with component
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 300)
    return () => clearTimeout(timer)
  }, [searchTerm])
  
  // API logic mixed with component  
  useEffect(() => {
    if (debouncedTerm) {
      setLoading(true)
      fetch(`/api/search?q=${debouncedTerm}`)
        .then(res => res.json())
        .then(data => {
          setResults(data.results)
          setLoading(false)
        })
    }
  }, [debouncedTerm])
  
  return <div>{/* Complex JSX mixing all concerns */}</div>
}
```

### Our Solution: Separation of Concerns

#### 1. Custom Hooks for Business Logic

```typescript
// src/features/SearchBar/hooks/useSearchAPI.ts
export const useSearchAPI = () => {
  const dispatch = useDispatch()
  const debouncedSearchTerm = useSelector(selectDebouncedSearchTerm)
  const isLoadingState = useSelector(selectIsLoading)

  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
    isFetching: searchFetching,
  } = useSearchContentQuery(
    { q: debouncedSearchTerm },
    {
      skip: !debouncedSearchTerm || debouncedSearchTerm.length < 2,
      refetchOnMountOrArgChange: true,
    }
  )

  // Handle side effects and state synchronization
  useEffect(() => {
    const isLoading = searchLoading || searchFetching
    if (isLoading !== isLoadingState) {
      dispatch(setIsLoading(isLoading))
    }
  }, [searchLoading, searchFetching, isLoadingState, dispatch])

  useEffect(() => {
    if (searchError) {
      dispatch(setSearchError(searchError))
    } else if (searchData) {
      dispatch(setSearchResults(searchData))
    }
  }, [searchData, searchError, dispatch])

  return { isLoading: searchLoading || searchFetching, error: searchError, data: searchData }
}
```

**See:** [useSearchAPI hook](src/features/SearchBar/hooks/useSearchAPI.ts) | [All SearchBar hooks](src/features/SearchBar/hooks/)

#### 2. Compound Components Pattern

```typescript
// src/features/SearchBar/SearchBar.tsx - Main orchestrator
const SearchBar = () => {
  const dispatch = useDispatch()

  // Coordinate multiple hooks for complete functionality
  useSearchAPI()
  useSearchDebounce(300)

  const handleItemClick = useCallback((item: SearchItem) => {
    console.log('Selected item:', item)
    dispatch(clearSearch())

    // Navigation logic based on item type
    switch (item.type) {
      case 'course':
        console.log(`Navigate to course: ${item.course_key}`)
        break
      case 'topic':
        console.log(`Navigate to topic: ${item.block_id} in course: ${item.course_name}`)
        break
      case 'subtopic':
        console.log(`Navigate to subtopic: ${item.block_id} in topic: ${item.topic_name}`)
        break
      case 'learning_objective':
        console.log(`Navigate to learning objective: ${item.block_id}`)
        break
    }
  }, [dispatch])

  useSearchKeyboard(handleItemClick)

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <SearchInput />      {/* Handles input UI and immediate state */}
      <SearchDropdown />   {/* Handles results display and interactions */}
    </div>
  )
}
```

#### 3. Focused Component Responsibilities

```typescript
// src/features/SearchBar/components/SearchInput/SearchInput.tsx
const SearchInput = () => {
  const dispatch = useDispatch()
  const searchTerm = useSelector(selectSearchTerm)
  const isLoading = useSelector(selectIsLoading)
  const searchRef = useRef(null)

  useClickOutside(searchRef) // Custom hook for UI behavior

  // Only handles input-specific interactions
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    dispatch(setSearchTerm(value))
    dispatch(setShowDropdown(value.length > 0))
  }, [dispatch])

  const handleInputFocus = useCallback(() => {
    if (searchTerm.length > 0) {
      dispatch(setShowDropdown(true))
    }
  }, [searchTerm, dispatch])

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative group">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Search for courses or topics"
          className="w-full px-10 py-2.5 text-sm rounded-lg border border-[#e5e7eb] focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary-50 transition-all duration-200"
        />
        
        <Search size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isLoading ? 'animate-pulse text-secondary' : 'text-virtu_grey'}`} />
        
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-textSecondary border-t-transparent" />
          </div>
        )}
      </div>
    </div>
  )
}
```

**See:** [SearchInput component](src/features/SearchBar/components/SearchInput/SearchInput.tsx) | [useClickOutside hook](src/features/SearchBar/hooks/useClickOutside.ts)

## 5. 🧪 Code Quality & Consistency

### The Challenge
Inconsistent code style and potential bugs in a team environment:

```typescript
// ❌ Inconsistent, error-prone code
const searchComponent = () => {
const [term,setTerm]=useState("")
useEffect(()=>{
  if(term){
fetch("/api/search?q="+term).then(res=>res.json()).then(data=>console.log(data))
  }
},[term])
return <input onChange={e=>setTerm(e.target.value)}/>
}
```

### Our Solution: Automated Quality Enforcement

#### 1. Comprehensive ESLint Configuration

```json
// .eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true
  },
  "extends": [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:import/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": { "jsx": true },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint", "react-hooks"],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": ["error"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "max-len": ["warn", { "code": 100, "ignoreComments": true }],
    "import/prefer-default-export": "off",
    "prettier/prettier": ["error", { "endOfLine": "auto" }]
  }
}
```

**See:** [ESLint configuration](.eslintrc.json)

#### 2. Prettier for Consistent Formatting

```json
// .prettierrc.json
{
  "trailingComma": "es5",
  "tabWidth": 4,
  "semi": false,
  "singleQuote": true
}
```

**See:** [Prettier configuration](.prettierrc.json)

#### 3. Package.json Scripts for Quality Gates

```json
// package.json
{
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "lint": "eslint \"src/**/*.{js,jsx,ts,tsx}\"",
    "lint:fix": "eslint --fix \"src/**/*.{js,jsx,ts,tsx}\"",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,css,md}\" --config ./.prettierrc.json"
  }
}
```

**See:** [Package configuration](package.json)

## 🎯 Results: What This Architecture Achieves

1. **🚀 Team Scalability**: Multiple developers can work on different features without conflicts
2. **⚡ Performance**: Selective re-rendering and memoization prevent unnecessary work
3. **🔒 Type Safety**: Comprehensive TypeScript catches errors at compile-time
4. **🧩 Maintainability**: Clear separation of concerns makes code easy to understand and modify
5. **🧪 Quality**: Automated tooling ensures consistent, bug-free code

This architecture supports teams of any size while maintaining code quality and performance as the application scales to serve complex educational workflows.

---

*This codebase demonstrates production-ready React/TypeScript patterns that solve real-world development challenges while maintaining excellent developer experience.*
