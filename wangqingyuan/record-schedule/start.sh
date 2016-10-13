#!/usr/bin/env bash
#
#/**
# * License placeholder.
# */
#

bin=`dirname "$0"`
bin=`cd "$bin"; pwd`
ROOT=`cd "${bin}/.."; pwd`

SERVICE=recordserver


# create log directory
LogDir="${ROOT}/logs"
mkdir -p "$LogDir"



stdout=${LogDir}/stdout
pid=${LogDir}/pid


if [ -f $pid ]; then
  if ps -p `cat $pid` > /dev/null 2>&1; then
	echo $SERVICE have started. PID: `cat $pid`.
	exit 1
  fi
fi

cd $ROOT/work
./recordserver > "$stdout"  </dev/null &
echo $! > ${pid}
echo $SERVICE have started. PID: `cat $pid`.
