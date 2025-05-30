import { useState } from "react";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

const App = function () {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  const handleAddTask = function (text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      };
    });
  };

  const handleDeleteTask = function (id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      };
    });
  };

  const handleSelectProject = function (id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id
      };
    });
  };

  const handleStartAddProject = function () {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null
      };
    });
  };

  const handleCancelAddProject = function () {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined
      };
    });
  };

  const handleAddProject = function (projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random()
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  };

  const handleDeleteProject = function () {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        )
      };
    });
  };

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProjectId === null)
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  else if (projectsState.selectedProjectId === undefined)
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
};

export default App;
