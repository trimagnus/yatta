export default {
  nextProjectUID: 4,
  nextTaskUID: 9,
  projects: [
    {
      uid: 1,
      projectTitle: "This is a project",
      tasks: [
      {
        uid: 1,
        priority: "High",
        date: "01/02/2022",
        text: "Buy bananas",
        completed: false,
      },
      {
        uid: 2,
        priority: "Low",
        date: "01/02/2022",
        text: "Program more",
        completed: true,
      },
      {
        uid: 3,
        priority: "Med",
        date: "01/02/2022",
        text: "Walk!",
        completed: false,
      },
      {
        uid: 4,
        priority: "No",
        date: "01/02/2022",
        text: "This has no priority",
        completed: false,
      }
      ]
    },
    {
      uid: 2,
      projectTitle: "Another Project",
      tasks: [
      {
        uid: 5,
        priority: "High",
        date: "01/02/2022",
        text: "Build a rocket",
        completed: false,
      },
      {
        uid: 6,
        priority: "Low",
        date: "01/02/2022",
        text: "Run around!",
        completed: false,
      },
      {
        uid: 7,
        priority: "Med",
        date: "01/02/2022",
        text: "Take over the world",
        completed: false,
      },
      {
        uid: 8,
        priority: "No",
        date: "01/02/2022",
        text: "Do other stuff as I see fit",
        completed: false,
      }
      ]
    },
    {
      uid: 3,
      projectTitle: "Empty Project",
      tasks: [
      
      ]
    },
  ]
};