# Tinance UI project

We have a legacy system using java/jsp that needs converting and extending using React/jsx as a single web page UI

In the legacy folder, we have the working code to present the application as a single javascript module and a Jsp page with supporting dom elements.

We have a simple menu with a set of functions, including login - which should be replaced by React router

The first task is to get this project working as a React SWP given the legacy code as the example. Completion is defined when we can 'npm start' the 'tinance-ui' folder and it will run the same way as the legacy example.

We also have JWT REST architecture inplace, so developing authentication and calls with JWT would be needed. 

```
git clone (this repository)
```
and open your browser at the legacy file

```
TinanceUI\legacy\main.html
```

Overview of pages and process

[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcbiAgICBzdWJncmFwaCBwdWJsaWNcbiAgICBBKExhbmRpbmcgcGFnZSkgLS0-IE4oc2lnbiB1cClcbiAgICBBIC0tPiBCKEJyb3dzZSBPZmZlcnMpXG4gICAgQiAtLT4gQyhTZWxlY3QgYW4gb2ZmZXIpICAgIFxuICAgIEEgLS0-IEwobG9naW4pICAgIFxuICAgIGVuZFxuICAgIHN1YmdyYXBoIGF1dGhlbnRpY2F0ZWQgICAgXG4gICAgQSAtLT4gSyhNeU9mZmVycylcbiAgICBLIC0tPiAgSihDcmVhdGUgb2ZmZXIpXG4gICAgQSAtLT4gTShUcmFkZXMpXG4gICAgXG4gICAgXG4gICBcbiAgICBDIC0tPiB8bG9nZ2VkIGlufCBEKGFjY2VwdCBvZmZlciwgc2l6ZSAmIHBheSBtZXRob2QpXG4gICAgRCAtLT4gRShEZXBvc2l0IFVTRFQpICAgIFxuICAgIEUgLS0-IEYoQXdhaXQgYmFuayBmdW5kcyByZWNlaXZlZClcbiAgICBFIC0tPiB8cG9zdCBtc2cgZGVwb3NpdHwgUyhzZXJ2ZXIpICAgIFxuICAgIEYgLS0-IHxmdW5kcyBub3QgYXJyaXZlZHwgSChOb3QgQXJyaXZlZClcbiAgICBGIC0tPiB8ZnVuZHMgYXJyaXZlfCBHKEFycml2ZWQpXG4gICAgSCAtLT4gfHBvc3QgbXNnIG5vdCBhcnJpdmVkfCBTXG4gICAgRyAtLT4gfHBvc3QgbXNnIGFycml2ZWR8IFNcbiAgICBHIC0tPiBUKFVTRFQgcmVsZWFzZWQpXG4gICAgVCAtLT4gfGNvbXBsZXRlIHRyYWRlfCBTXG4gICAgZW5kIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQiLCJ0aGVtZVZhcmlhYmxlcyI6eyJiYWNrZ3JvdW5kIjoid2hpdGUiLCJwcmltYXJ5Q29sb3IiOiIjRUNFQ0ZGIiwic2Vjb25kYXJ5Q29sb3IiOiIjZmZmZmRlIiwidGVydGlhcnlDb2xvciI6ImhzbCg4MCwgMTAwJSwgOTYuMjc0NTA5ODAzOSUpIiwicHJpbWFyeUJvcmRlckNvbG9yIjoiaHNsKDI0MCwgNjAlLCA4Ni4yNzQ1MDk4MDM5JSkiLCJzZWNvbmRhcnlCb3JkZXJDb2xvciI6ImhzbCg2MCwgNjAlLCA4My41Mjk0MTE3NjQ3JSkiLCJ0ZXJ0aWFyeUJvcmRlckNvbG9yIjoiaHNsKDgwLCA2MCUsIDg2LjI3NDUwOTgwMzklKSIsInByaW1hcnlUZXh0Q29sb3IiOiIjMTMxMzAwIiwic2Vjb25kYXJ5VGV4dENvbG9yIjoiIzAwMDAyMSIsInRlcnRpYXJ5VGV4dENvbG9yIjoicmdiKDkuNTAwMDAwMDAwMSwgOS41MDAwMDAwMDAxLCA5LjUwMDAwMDAwMDEpIiwibGluZUNvbG9yIjoiIzMzMzMzMyIsInRleHRDb2xvciI6IiMzMzMiLCJtYWluQmtnIjoiI0VDRUNGRiIsInNlY29uZEJrZyI6IiNmZmZmZGUiLCJib3JkZXIxIjoiIzkzNzBEQiIsImJvcmRlcjIiOiIjYWFhYTMzIiwiYXJyb3doZWFkQ29sb3IiOiIjMzMzMzMzIiwiZm9udEZhbWlseSI6IlwidHJlYnVjaGV0IG1zXCIsIHZlcmRhbmEsIGFyaWFsIiwiZm9udFNpemUiOiIxNnB4IiwibGFiZWxCYWNrZ3JvdW5kIjoiI2U4ZThlOCIsIm5vZGVCa2ciOiIjRUNFQ0ZGIiwibm9kZUJvcmRlciI6IiM5MzcwREIiLCJjbHVzdGVyQmtnIjoiI2ZmZmZkZSIsImNsdXN0ZXJCb3JkZXIiOiIjYWFhYTMzIiwiZGVmYXVsdExpbmtDb2xvciI6IiMzMzMzMzMiLCJ0aXRsZUNvbG9yIjoiIzMzMyIsImVkZ2VMYWJlbEJhY2tncm91bmQiOiIjZThlOGU4IiwiYWN0b3JCb3JkZXIiOiJoc2woMjU5LjYyNjE2ODIyNDMsIDU5Ljc3NjUzNjMxMjglLCA4Ny45MDE5NjA3ODQzJSkiLCJhY3RvckJrZyI6IiNFQ0VDRkYiLCJhY3RvclRleHRDb2xvciI6ImJsYWNrIiwiYWN0b3JMaW5lQ29sb3IiOiJncmV5Iiwic2lnbmFsQ29sb3IiOiIjMzMzIiwic2lnbmFsVGV4dENvbG9yIjoiIzMzMyIsImxhYmVsQm94QmtnQ29sb3IiOiIjRUNFQ0ZGIiwibGFiZWxCb3hCb3JkZXJDb2xvciI6ImhzbCgyNTkuNjI2MTY4MjI0MywgNTkuNzc2NTM2MzEyOCUsIDg3LjkwMTk2MDc4NDMlKSIsImxhYmVsVGV4dENvbG9yIjoiYmxhY2siLCJsb29wVGV4dENvbG9yIjoiYmxhY2siLCJub3RlQm9yZGVyQ29sb3IiOiIjYWFhYTMzIiwibm90ZUJrZ0NvbG9yIjoiI2ZmZjVhZCIsIm5vdGVUZXh0Q29sb3IiOiJibGFjayIsImFjdGl2YXRpb25Cb3JkZXJDb2xvciI6IiM2NjYiLCJhY3RpdmF0aW9uQmtnQ29sb3IiOiIjZjRmNGY0Iiwic2VxdWVuY2VOdW1iZXJDb2xvciI6IndoaXRlIiwic2VjdGlvbkJrZ0NvbG9yIjoicmdiYSgxMDIsIDEwMiwgMjU1LCAwLjQ5KSIsImFsdFNlY3Rpb25Ca2dDb2xvciI6IndoaXRlIiwic2VjdGlvbkJrZ0NvbG9yMiI6IiNmZmY0MDAiLCJ0YXNrQm9yZGVyQ29sb3IiOiIjNTM0ZmJjIiwidGFza0JrZ0NvbG9yIjoiIzhhOTBkZCIsInRhc2tUZXh0TGlnaHRDb2xvciI6IndoaXRlIiwidGFza1RleHRDb2xvciI6IndoaXRlIiwidGFza1RleHREYXJrQ29sb3IiOiJibGFjayIsInRhc2tUZXh0T3V0c2lkZUNvbG9yIjoiYmxhY2siLCJ0YXNrVGV4dENsaWNrYWJsZUNvbG9yIjoiIzAwMzE2MyIsImFjdGl2ZVRhc2tCb3JkZXJDb2xvciI6IiM1MzRmYmMiLCJhY3RpdmVUYXNrQmtnQ29sb3IiOiIjYmZjN2ZmIiwiZ3JpZENvbG9yIjoibGlnaHRncmV5IiwiZG9uZVRhc2tCa2dDb2xvciI6ImxpZ2h0Z3JleSIsImRvbmVUYXNrQm9yZGVyQ29sb3IiOiJncmV5IiwiY3JpdEJvcmRlckNvbG9yIjoiI2ZmODg4OCIsImNyaXRCa2dDb2xvciI6InJlZCIsInRvZGF5TGluZUNvbG9yIjoicmVkIiwibGFiZWxDb2xvciI6ImJsYWNrIiwiZXJyb3JCa2dDb2xvciI6IiM1NTIyMjIiLCJlcnJvclRleHRDb2xvciI6IiM1NTIyMjIiLCJjbGFzc1RleHQiOiIjMTMxMzAwIiwiZmlsbFR5cGUwIjoiI0VDRUNGRiIsImZpbGxUeXBlMSI6IiNmZmZmZGUiLCJmaWxsVHlwZTIiOiJoc2woMzA0LCAxMDAlLCA5Ni4yNzQ1MDk4MDM5JSkiLCJmaWxsVHlwZTMiOiJoc2woMTI0LCAxMDAlLCA5My41Mjk0MTE3NjQ3JSkiLCJmaWxsVHlwZTQiOiJoc2woMTc2LCAxMDAlLCA5Ni4yNzQ1MDk4MDM5JSkiLCJmaWxsVHlwZTUiOiJoc2woLTQsIDEwMCUsIDkzLjUyOTQxMTc2NDclKSIsImZpbGxUeXBlNiI6ImhzbCg4LCAxMDAlLCA5Ni4yNzQ1MDk4MDM5JSkiLCJmaWxsVHlwZTciOiJoc2woMTg4LCAxMDAlLCA5My41Mjk0MTE3NjQ3JSkifX0sInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/edit##eyJjb2RlIjoiZ3JhcGggVERcbiAgICBzdWJncmFwaCBwdWJsaWNcbiAgICBBKExhbmRpbmcgcGFnZSkgLS0-IE4oc2lnbiB1cClcbiAgICBBIC0tPiBCKEJyb3dzZSBPZmZlcnMpXG4gICAgQiAtLT4gQyhTZWxlY3QgYW4gb2ZmZXIpICAgIFxuICAgIEEgLS0-IEwobG9naW4pICAgIFxuICAgIGVuZFxuICAgIHN1YmdyYXBoIGF1dGhlbnRpY2F0ZWQgICAgXG4gICAgQSAtLT4gSyhNeU9mZmVycylcbiAgICBLIC0tPiAgSihDcmVhdGUgb2ZmZXIpXG4gICAgQSAtLT4gTShUcmFkZXMpXG4gICAgXG4gICAgXG4gICBcbiAgICBDIC0tPiB8bG9nZ2VkIGlufCBEKGFjY2VwdCBvZmZlciwgc2l6ZSAmIHBheSBtZXRob2QpXG4gICAgRCAtLT4gRShEZXBvc2l0IFVTRFQpICAgIFxuICAgIEUgLS0-IEYoQXdhaXQgYmFuayBmdW5kcyByZWNlaXZlZClcbiAgICBFIC0tPiB8cG9zdCBtc2cgZGVwb3NpdHwgUyhzZXJ2ZXIpICAgIFxuICAgIEYgLS0-IHxmdW5kcyBub3QgYXJyaXZlZHwgSChOb3QgQXJyaXZlZClcbiAgICBGIC0tPiB8ZnVuZHMgYXJyaXZlfCBHKEFycml2ZWQpXG4gICAgSCAtLT4gfHBvc3QgbXNnIG5vdCBhcnJpdmVkfCBTXG4gICAgRyAtLT4gfHBvc3QgbXNnIGFycml2ZWR8IFNcbiAgICBHIC0tPiBUKFVTRFQgcmVsZWFzZWQpXG4gICAgVCAtLT4gfGNvbXBsZXRlIHRyYWR8IFNcbiAgICBlbmQiLCJtZXJtYWlkIjoie1xuICBcInRoZW1lXCI6IFwiZGVmYXVsdFwiLFxuICBcInRoZW1lVmFyaWFibGVzXCI6IHtcbiAgICBcImJhY2tncm91bmRcIjogXCJ3aGl0ZVwiLFxuICAgIFwicHJpbWFyeUNvbG9yXCI6IFwiI0VDRUNGRlwiLFxuICAgIFwic2Vjb25kYXJ5Q29sb3JcIjogXCIjZmZmZmRlXCIsXG4gICAgXCJ0ZXJ0aWFyeUNvbG9yXCI6IFwiaHNsKDgwLCAxMDAlLCA5Ni4yNzQ1MDk4MDM5JSlcIixcbiAgICBcInByaW1hcnlCb3JkZXJDb2xvclwiOiBcImhzbCgyNDAsIDYwJSwgODYuMjc0NTA5ODAzOSUpXCIsXG4gICAgXCJzZWNvbmRhcnlCb3JkZXJDb2xvclwiOiBcImhzbCg2MCwgNjAlLCA4My41Mjk0MTE3NjQ3JSlcIixcbiAgICBcInRlcnRpYXJ5Qm9yZGVyQ29sb3JcIjogXCJoc2woODAsIDYwJSwgODYuMjc0NTA5ODAzOSUpXCIsXG4gICAgXCJwcmltYXJ5VGV4dENvbG9yXCI6IFwiIzEzMTMwMFwiLFxuICAgIFwic2Vjb25kYXJ5VGV4dENvbG9yXCI6IFwiIzAwMDAyMVwiLFxuICAgIFwidGVydGlhcnlUZXh0Q29sb3JcIjogXCJyZ2IoOS41MDAwMDAwMDAxLCA5LjUwMDAwMDAwMDEsIDkuNTAwMDAwMDAwMSlcIixcbiAgICBcImxpbmVDb2xvclwiOiBcIiMzMzMzMzNcIixcbiAgICBcInRleHRDb2xvclwiOiBcIiMzMzNcIixcbiAgICBcIm1haW5Ca2dcIjogXCIjRUNFQ0ZGXCIsXG4gICAgXCJzZWNvbmRCa2dcIjogXCIjZmZmZmRlXCIsXG4gICAgXCJib3JkZXIxXCI6IFwiIzkzNzBEQlwiLFxuICAgIFwiYm9yZGVyMlwiOiBcIiNhYWFhMzNcIixcbiAgICBcImFycm93aGVhZENvbG9yXCI6IFwiIzMzMzMzM1wiLFxuICAgIFwiZm9udEZhbWlseVwiOiBcIlxcXCJ0cmVidWNoZXQgbXNcXFwiLCB2ZXJkYW5hLCBhcmlhbFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIxNnB4XCIsXG4gICAgXCJsYWJlbEJhY2tncm91bmRcIjogXCIjZThlOGU4XCIsXG4gICAgXCJub2RlQmtnXCI6IFwiI0VDRUNGRlwiLFxuICAgIFwibm9kZUJvcmRlclwiOiBcIiM5MzcwREJcIixcbiAgICBcImNsdXN0ZXJCa2dcIjogXCIjZmZmZmRlXCIsXG4gICAgXCJjbHVzdGVyQm9yZGVyXCI6IFwiI2FhYWEzM1wiLFxuICAgIFwiZGVmYXVsdExpbmtDb2xvclwiOiBcIiMzMzMzMzNcIixcbiAgICBcInRpdGxlQ29sb3JcIjogXCIjMzMzXCIsXG4gICAgXCJlZGdlTGFiZWxCYWNrZ3JvdW5kXCI6IFwiI2U4ZThlOFwiLFxuICAgIFwiYWN0b3JCb3JkZXJcIjogXCJoc2woMjU5LjYyNjE2ODIyNDMsIDU5Ljc3NjUzNjMxMjglLCA4Ny45MDE5NjA3ODQzJSlcIixcbiAgICBcImFjdG9yQmtnXCI6IFwiI0VDRUNGRlwiLFxuICAgIFwiYWN0b3JUZXh0Q29sb3JcIjogXCJibGFja1wiLFxuICAgIFwiYWN0b3JMaW5lQ29sb3JcIjogXCJncmV5XCIsXG4gICAgXCJzaWduYWxDb2xvclwiOiBcIiMzMzNcIixcbiAgICBcInNpZ25hbFRleHRDb2xvclwiOiBcIiMzMzNcIixcbiAgICBcImxhYmVsQm94QmtnQ29sb3JcIjogXCIjRUNFQ0ZGXCIsXG4gICAgXCJsYWJlbEJveEJvcmRlckNvbG9yXCI6IFwiaHNsKDI1OS42MjYxNjgyMjQzLCA1OS43NzY1MzYzMTI4JSwgODcuOTAxOTYwNzg0MyUpXCIsXG4gICAgXCJsYWJlbFRleHRDb2xvclwiOiBcImJsYWNrXCIsXG4gICAgXCJsb29wVGV4dENvbG9yXCI6IFwiYmxhY2tcIixcbiAgICBcIm5vdGVCb3JkZXJDb2xvclwiOiBcIiNhYWFhMzNcIixcbiAgICBcIm5vdGVCa2dDb2xvclwiOiBcIiNmZmY1YWRcIixcbiAgICBcIm5vdGVUZXh0Q29sb3JcIjogXCJibGFja1wiLFxuICAgIFwiYWN0aXZhdGlvbkJvcmRlckNvbG9yXCI6IFwiIzY2NlwiLFxuICAgIFwiYWN0aXZhdGlvbkJrZ0NvbG9yXCI6IFwiI2Y0ZjRmNFwiLFxuICAgIFwic2VxdWVuY2VOdW1iZXJDb2xvclwiOiBcIndoaXRlXCIsXG4gICAgXCJzZWN0aW9uQmtnQ29sb3JcIjogXCJyZ2JhKDEwMiwgMTAyLCAyNTUsIDAuNDkpXCIsXG4gICAgXCJhbHRTZWN0aW9uQmtnQ29sb3JcIjogXCJ3aGl0ZVwiLFxuICAgIFwic2VjdGlvbkJrZ0NvbG9yMlwiOiBcIiNmZmY0MDBcIixcbiAgICBcInRhc2tCb3JkZXJDb2xvclwiOiBcIiM1MzRmYmNcIixcbiAgICBcInRhc2tCa2dDb2xvclwiOiBcIiM4YTkwZGRcIixcbiAgICBcInRhc2tUZXh0TGlnaHRDb2xvclwiOiBcIndoaXRlXCIsXG4gICAgXCJ0YXNrVGV4dENvbG9yXCI6IFwid2hpdGVcIixcbiAgICBcInRhc2tUZXh0RGFya0NvbG9yXCI6IFwiYmxhY2tcIixcbiAgICBcInRhc2tUZXh0T3V0c2lkZUNvbG9yXCI6IFwiYmxhY2tcIixcbiAgICBcInRhc2tUZXh0Q2xpY2thYmxlQ29sb3JcIjogXCIjMDAzMTYzXCIsXG4gICAgXCJhY3RpdmVUYXNrQm9yZGVyQ29sb3JcIjogXCIjNTM0ZmJjXCIsXG4gICAgXCJhY3RpdmVUYXNrQmtnQ29sb3JcIjogXCIjYmZjN2ZmXCIsXG4gICAgXCJncmlkQ29sb3JcIjogXCJsaWdodGdyZXlcIixcbiAgICBcImRvbmVUYXNrQmtnQ29sb3JcIjogXCJsaWdodGdyZXlcIixcbiAgICBcImRvbmVUYXNrQm9yZGVyQ29sb3JcIjogXCJncmV5XCIsXG4gICAgXCJjcml0Qm9yZGVyQ29sb3JcIjogXCIjZmY4ODg4XCIsXG4gICAgXCJjcml0QmtnQ29sb3JcIjogXCJyZWRcIixcbiAgICBcInRvZGF5TGluZUNvbG9yXCI6IFwicmVkXCIsXG4gICAgXCJsYWJlbENvbG9yXCI6IFwiYmxhY2tcIixcbiAgICBcImVycm9yQmtnQ29sb3JcIjogXCIjNTUyMjIyXCIsXG4gICAgXCJlcnJvclRleHRDb2xvclwiOiBcIiM1NTIyMjJcIixcbiAgICBcImNsYXNzVGV4dFwiOiBcIiMxMzEzMDBcIixcbiAgICBcImZpbGxUeXBlMFwiOiBcIiNFQ0VDRkZcIixcbiAgICBcImZpbGxUeXBlMVwiOiBcIiNmZmZmZGVcIixcbiAgICBcImZpbGxUeXBlMlwiOiBcImhzbCgzMDQsIDEwMCUsIDk2LjI3NDUwOTgwMzklKVwiLFxuICAgIFwiZmlsbFR5cGUzXCI6IFwiaHNsKDEyNCwgMTAwJSwgOTMuNTI5NDExNzY0NyUpXCIsXG4gICAgXCJmaWxsVHlwZTRcIjogXCJoc2woMTc2LCAxMDAlLCA5Ni4yNzQ1MDk4MDM5JSlcIixcbiAgICBcImZpbGxUeXBlNVwiOiBcImhzbCgtNCwgMTAwJSwgOTMuNTI5NDExNzY0NyUpXCIsXG4gICAgXCJmaWxsVHlwZTZcIjogXCJoc2woOCwgMTAwJSwgOTYuMjc0NTA5ODAzOSUpXCIsXG4gICAgXCJmaWxsVHlwZTdcIjogXCJoc2woMTg4LCAxMDAlLCA5My41Mjk0MTE3NjQ3JSlcIlxuICB9XG59IiwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ)


![Screenshot](image1.png)
![Screenshot](image2.png)
![Screenshot](image3.png)
![Screenshot](image4.png)