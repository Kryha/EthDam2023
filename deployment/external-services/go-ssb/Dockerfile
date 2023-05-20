FROM golang

WORKDIR /usr
RUN git clone https://github.com/ssbc/go-ssb

WORKDIR /usr/go-ssb
RUN go install /usr/go-ssb/cmd/go-sbot
RUN go install /usr/go-ssb/cmd/sbotcli
RUN echo 'export PATH=$PATH:${HOME}/go/bin' >> ~/.bashrc

CMD ["go-sbot"]
