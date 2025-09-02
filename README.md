
OrganizationEmployeesDemoApp - FrontEnd

⚡ Quick Run Order: 

Start MySQL, 

Run Backend (mvn spring-boot:run)

Run Frontend (npm start)

Open UI → http://localhost:3000

🎨 Running the Frontend (React)

NPM Packages Required
react
react-dom
react-router-dom
axios
bootstrap (optional for styling)

Steps
Navigate to frontend folder:
cd frontend

Install dependencies:
npm install

Start app:

npm start

Frontend runs at: http://localhost:3000

🔗 API Endpoints

Add Organization → POST /organizations
Add Employee → POST /employees?name=...&role=...&email=...&orgName=...
Get Employees by Org → GET /employees/byOrg/{orgName}
