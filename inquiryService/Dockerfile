FROM python:latest
MAINTAINER Don Schenck <don.schenck@gmail.com>

RUN apt-get update
RUN pip install --upgrade pip
RUN pip install flask
RUN pip install pymongo
RUN pip install bson

RUN mkdir -p /src/inquiryService
COPY inquiryService.py /src/inquiryService
WORKDIR /src/inquiryService
CMD python inquiryService.py
