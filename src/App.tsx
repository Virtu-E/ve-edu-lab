import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePageView from './views/HomepageView/HomePageView'
import './index.css'
import CourseDetail from './views/CourseDetailView/CourseDetailView'
import SearchView from './views/SearchView/SearchView'
import ProfileView from './views/ProfileView/ProfileView'
import { useUserMetaData, useUserProfile } from '@features/index'
import Assessment from '@features/Assessment/Assessment'
import CourseWorkingView from './views/CourseWorkingView/CourseWorkingView'
import { AuthProvider } from './AuthContext'
import { ProtectedRoute } from './ProtectedRoute'
import { AuthCallback } from './AuthCallback'
import { withLayout } from './withLayout'
import ScrollToTop from './ScrollToTop'
import TopicDetailView from './views/TopicDetailView/TopicDetailView'
import ResourceExplorerView from './views/ResourceExplorerView/ResourceExplorerView'
import AssessmentResult from '@features/AssessmentResult/AssessmentResult'
import MyLearning from './views/MyLearning/MyLearning'
import PhysicsFlashcards from '@features/FlashCards/FlashCardDetail/FlashCardDetail'

const publicRoutes = [{ path: '/', element: <HomePageView /> }]

const publicRoutesContainer = [
    { path: 'discover/', element: <SearchView /> },

    { path: 'profile/', element: <ProfileView /> },
    {
        path: 'my-learning/*',
        element: <MyLearning />,
    },
]

const protectedRoutesNoContainer = [
    { path: '/:courseID/:unitID/', element: <CourseWorkingView /> },
    {
        path: 'my-learning/subjects/:courseID/learn',
        element: <TopicDetailView />,
    },
    { path: 'my-learning/subjects/:courseID', element: <CourseDetail /> },
    {
        path: 'my-learning/flashcards/:topicID/',
        element: <PhysicsFlashcards />,
    },
]

function App(): React.ReactElement {
    useUserProfile()
    useUserMetaData()

    return (
        <AuthProvider>
            <ScrollToTop />
            <Routes>
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route
                    path="assessment/:objectiveId"
                    element={<Assessment />}
                />
                <Route
                    path="assessment/result/"
                    element={<AssessmentResult />}
                />
                <Route
                    path="resources/:objectiveID"
                    element={<ResourceExplorerView />}
                />

                {withLayout(publicRoutes, true)}
                {withLayout(publicRoutesContainer)}

                <Route element={<ProtectedRoute />}>
                    {withLayout(protectedRoutesNoContainer, true)}
                </Route>
            </Routes>
        </AuthProvider>
    )
}

export default App
