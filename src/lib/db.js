import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

// Ensure directory exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'));
}

// Ensure file exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ users: [], resumes: [], jobs: [] }, null, 2));
}

export const db = {
  read: () => {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  },
  
  write: (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  },
  
  // User operations
  getUser: (id) => {
    const data = db.read();
    return data.users.find(u => u.id === id);
  },
  
  saveUser: (user) => {
    const data = db.read();
    const index = data.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      data.users[index] = { ...data.users[index], ...user };
    } else {
      data.users.push(user);
    }
    db.write(data);
  },
  
  // Resume operations (Isolated by userId)
  getResume: (userId) => {
    const data = db.read();
    return data.resumes.find(r => r.userId === userId);
  },
  
  saveResume: (userId, resumeData) => {
    const data = db.read();
    const index = data.resumes.findIndex(r => r.userId === userId);
    const newEntry = { userId, ...resumeData, updatedAt: new Date().toISOString() };
    
    if (index !== -1) {
      data.resumes[index] = newEntry;
    } else {
      data.resumes.push(newEntry);
    }
    db.write(data);
  }
};
