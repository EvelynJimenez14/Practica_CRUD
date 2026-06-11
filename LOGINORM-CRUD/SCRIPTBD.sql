DROP DATABASE IF EXISTS usuarios;
CREATE DATABASE usuarios;
USE usuarios;
CREATE TABLE login (
    idLOGIN     INT         NOT NULL AUTO_INCREMENT,
    USERNAME    VARCHAR(45) NOT NULL UNIQUE,
    PASSWORD    VARCHAR(45) NOT NULL,
    TIPOUSUARIO VARCHAR(45) NOT NULL,
    PRIMARY KEY (idLOGIN)
);
INSERT INTO login (USERNAME, PASSWORD, TIPOUSUARIO) VALUES ('admin', '1234', 'administrador');

DROP DATABASE IF EXISTS crudjson;
CREATE DATABASE crudjson;
USE crudjson;

CREATE TABLE tablajson (
    idEjercicio INT  NOT NULL AUTO_INCREMENT,
    columnajson JSON,
    PRIMARY KEY (idEjercicio)
);

INSERT INTO tablajson (columnajson) VALUES ('{"id":"1","pregunta":"¿Qué métrica mide el error promedio de un modelo de predicción?","respuesta":"B","opciones":[{"clave":"A","texto":"Accuracy"},{"clave":"B","texto":"RMSE"},{"clave":"C","texto":"F1-Score"},{"clave":"D","texto":"AUC-ROC"}]}');
INSERT INTO tablajson (columnajson) VALUES ('{"id":"2","pregunta":"¿Qué hace la etapa de limpieza de datos en un pipeline?","respuesta":"A","opciones":[{"clave":"A","texto":"Elimina nulos, duplicados y valores atípicos"},{"clave":"B","texto":"Entrena el modelo predictivo"},{"clave":"C","texto":"Genera gráficas de resultados"},{"clave":"D","texto":"Divide el dataset en train y test"}]}');
INSERT INTO tablajson (columnajson) VALUES ('{"id":"3","pregunta":"¿Qué algoritmo es más adecuado para predecir la demanda de productos en e-commerce?","respuesta":"C","opciones":[{"clave":"A","texto":"K-Means"},{"clave":"B","texto":"Naive Bayes"},{"clave":"C","texto":"Random Forest Regressor"},{"clave":"D","texto":"PCA"}]}');
INSERT INTO tablajson (columnajson) VALUES ('{"id":"4","pregunta":"¿Qué significa un valor de R² igual a 0.85 en un modelo?","respuesta":"B","opciones":[{"clave":"A","texto":"El modelo tiene 85% de errores"},{"clave":"B","texto":"El modelo explica el 85% de la varianza de los datos"},{"clave":"C","texto":"El modelo predice con 15% de exactitud"},{"clave":"D","texto":"El dataset tiene 85% de valores nulos"}]}');
INSERT INTO tablajson (columnajson) VALUES ('{"id":"5","pregunta":"¿Qué etapa del pipeline de datos convierte columnas de texto a valores numéricos?","respuesta":"D","opciones":[{"clave":"A","texto":"Limpieza"},{"clave":"B","texto":"Recolección"},{"clave":"C","texto":"Evaluación"},{"clave":"D","texto":"Transformación"}]}');
